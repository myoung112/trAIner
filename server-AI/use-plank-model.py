import os
import sys
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

model_path = sys.argv[1]
image_folder_path = sys.argv[2]

model = tf.keras.models.load_model(model_path)


def preprocess_image(image_path, target_size=(128, 128)):  # 이미지 파일을 불러와 전처리하는 함수
    img = image.load_img(image_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # 모델 예측을 위해 차원 확장
    img_array /= 255.0  # 이미지를 0과 1 사이로 스케일링
    return img_array


def load_and_preprocess_from_directory(directory_path, target_size=(128, 128)):  # 지정된 디렉토리 내의 모든 이미지를 불러와 전처리하는 함수
    processed_images = []
    for file_name in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file_name)
        if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            img = preprocess_image(file_path, target_size=target_size)
            processed_images.append(img)
    return np.vstack(processed_images)  # 전처리된 이미지들을 하나의 numpy 배열로 합침


preprocessed_images = load_and_preprocess_from_directory(image_folder_path)
predictions = model.predict(preprocessed_images, verbose=0)

# 모델의 출력층에 접근하여 클래스의 개수 얻기
output_layer = model.layers[-1]  # 모델의 마지막 층 (출력층)을 가져옴
num_classes = output_layer.units  # 출력층의 유닛 수를 가져옴, 이는 클래스의 수와 동일

class_labels = []
# 클래스 라벨 정의
class_labels.append('바른 자세')
class_labels.append('팔꿈치가 어깨보다 안쪽에 위치하지 않음')
class_labels.append('몸통과 엉덩이의 정렬 유지 필요')
class_labels.append('상체의 충분한 거리 유지 필요')

# 예측 배열에서 각 입력에 대해 최고 확률을 가진 클래스의 인덱스를 찾음
predicted_classes = np.argmax(predictions, axis=1)

# 각 클래스별 이미지 수를 계산하기 위한 딕셔너리 초기화
class_counts = {class_label: 0 for class_label in class_labels}

# 예측된 클래스별로 이미지 수를 계산
for class_index in predicted_classes:
    class_label = class_labels[class_index]
    class_counts[class_label] += 1

# 가장 많은 이미지를 포함하는 클래스 찾기
max_count = max(class_counts.values())  # 최대 이미지 수
max_classes = [class_label for class_label, count in class_counts.items() if count == max_count]

# 결과 출력
for class_label in max_classes:
    print(class_label)
