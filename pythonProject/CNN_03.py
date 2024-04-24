import os.path
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import EarlyStopping, ModelCheckpoint

base_dir = 'cnn_data'

train_dir = os.path.join(base_dir, 'training')
valid_dir = os.path.join(base_dir, 'validation')
test_dir = os.path.join(base_dir, 'test')

# ImageDataGenerator 초기화
datagen = ImageDataGenerator(rescale=1./255)  # 이미지를 0과 1 사이의 값으로 정규화

# 훈련 데이터셋을 위한 제너레이터 생성
train_generator = datagen.flow_from_directory(
        train_dir,  # 훈련 데이터셋 디렉토리
        target_size=(128, 128),
        batch_size=32,
        class_mode='categorical')

validation_generator = datagen.flow_from_directory(
        valid_dir,  # 검증 데이터셋 디렉토리
        target_size=(128, 128),
        batch_size=32,
        class_mode='categorical')

test_generator = datagen.flow_from_directory(
        test_dir,  # 테스트 데이터셋 디렉토리
        target_size=(128, 128),
        batch_size=32,
        class_mode='categorical',  # 다중 분류 문제인 경우 'categorical'
        shuffle=False)  # 평가 시 데이터 순서를 유지

# 모델 구성
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128, 128, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(512, activation='relu'),
    Dense(train_generator.num_classes, activation='softmax')
])

# 모델 컴파일
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

early_stop = EarlyStopping(monitor='val_loss', patience=10)
checkpoint = ModelCheckpoint('best_model.h5', save_best_only=True)

history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    epochs=25,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    callbacks=[early_stop, checkpoint]
)

# 모델 성능 평가
test_loss, test_acc = model.evaluate(test_generator, steps=test_generator.samples // test_generator.batch_size)

print('\n테스트 정확도:', test_acc)
