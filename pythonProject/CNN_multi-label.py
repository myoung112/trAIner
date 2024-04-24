import os
import cv2
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping

label_path = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]]
prefix = [f"{i:03d}" for i in range(505, 513)]
prefix_to_label = dict(zip(prefix, label_path))


def process_dataset(root_folder):
    image_paths = []
    label_data = []

    for roots, dirs, files in os.walk(root_folder):
        for file in files:
            if file.endswith('.jpg'):
                # 파일 이름 앞 3글자(레이블) 추출
                nums = file[0:3]

                # prefix에 따른 label 할당
                label = prefix_to_label.get(nums)

                # 유효한 레이블이 있는 경우에만 리스트에 추가
                if label is not None:
                    image_paths.append(os.path.join(roots, file))
                    label_data.append(label)

    return image_paths, label_data


train_folder = r'E:\AI\dataset_skeleton_sep\face\BicycleCrunch\training'
valid_folder = r'E:\AI\dataset_skeleton_sep\face\BicycleCrunch\validation'
test_folder = r'E:\AI\dataset_skeleton_sep\face\BicycleCrunch\test'

train_image_paths, train_label_data = process_dataset(train_folder)
valid_image_paths, valid_label_data = process_dataset(valid_folder)
test_image_paths, test_label_data = process_dataset(test_folder)

train_label_data = np.array(train_label_data)
valid_label_data = np.array(valid_label_data)
test_label_data = np.array(test_label_data)

# 이미지 - 라벨 개수 확인
print(len(train_image_paths), len(train_label_data))
print(len(valid_image_paths), len(valid_label_data))
print(len(test_image_paths), len(test_label_data))


def resize_img(image_paths):
    images_resized = []  # 리사이즈된 이미지를 저장할 리스트
    for image_path in image_paths:
        image = cv2.imread(image_path)  # 각 이미지 경로로부터 이미지를 읽음
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # BGR에서 RGB로 색상 변환
        image_resized = cv2.resize(image, (128, 128))  # 이미지 리사이즈
        images_resized.append(image_resized)  # 결과 리스트에 추가
    images_resized = np.array(images_resized) / 255.0  # numpy 배열로 변환 및 정규화
    return images_resized


train_image_resized = resize_img(train_image_paths)
valid_image_resized = resize_img(valid_image_paths)
test_image_resized = resize_img(test_image_paths)

print('done')

print(type(valid_label_data))  # 데이터 타입 확인
if isinstance(valid_label_data, np.ndarray):
    print(valid_label_data.shape)  # numpy 배열인 경우, 모양 확인
print(type(train_label_data))  # 데이터 타입 확인
if isinstance(train_label_data, np.ndarray):
    print(train_label_data.shape)  # numpy 배열인 경우, 모양 확인


# 모델 구성
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128, 128, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    # 멀티라벨 분류를 위한 sigmoid 활성화 함수 사용
    Dense(3, activation='sigmoid')
])

model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])


earlyStopping = EarlyStopping(monitor='val_loss', patience=7, mode='min', verbose=1)


model.fit(train_image_resized,
          train_label_data,
          validation_data=(valid_image_resized, valid_label_data),
          epochs=25,
          batch_size=32,
         callbacks=[earlyStopping])


test_loss, test_acc = model.evaluate(test_image_resized, test_label_data)

print('\n테스트 정확도:', test_acc)

