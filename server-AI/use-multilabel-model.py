import os
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

model_path = r'E:\AImodel\models\Face-ResNet-BicycleCrunch-multiLabel-model'
image_folder_path = r'E:\AItemp\testdata\BC test01'

model = tf.keras.models.load_model(model_path)


def preprocess_image(image_path, target_size=(128, 128)):
    """이미지 파일을 불러와 전처리하는 함수"""
    img = image.load_img(image_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # 모델 예측을 위해 차원 확장
    img_array /= 255.0  # 이미지를 0과 1 사이로 스케일링
    return img_array


def load_and_preprocess_from_directory(directory_path, target_size=(128, 128)):
    # 지정된 디렉토리 내의 모든 이미지를 불러와 전처리
    processed_images = []
    for file_name in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file_name)
        if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            img = preprocess_image(file_path, target_size=target_size)
            processed_images.append(img)
    return np.vstack(processed_images)


preprocessed_images = load_and_preprocess_from_directory(image_folder_path)

# 모델 예측 수행
model_predictions = model.predict(preprocessed_images)
# model_predictions는 [prediction1, prediction2, prediction3] 형태의 리스트를 반환


# 슬라이딩 윈도우 함수 정의 (앞서 제시된 예시 사용)
def apply_sliding_window(sequence, window_size=5, method='mean'):
    smoothed_sequence = []
    for i in range(len(sequence)):
        start_idx = max(0, i - window_size // 2)
        end_idx = min(len(sequence), i + window_size // 2 + 1)
        window = sequence[start_idx:end_idx]
        if method == 'mean':
            smoothed_value = np.mean(window)
        elif method == 'median':
            smoothed_value = np.median(window)
        else:
            raise ValueError("Method should be 'mean' or 'median'")
        smoothed_sequence.append(smoothed_value)
    return smoothed_sequence


# 각 예측 결과에 대해 슬라이딩 윈도우 적용
smoothed_predictions = []
for prediction in model_predictions:
    smoothed = apply_sliding_window(prediction.flatten(), window_size=5, method='mean')  # 예측 결과가 2차원일 수 있으므로 flatten() 호출
    smoothed_predictions.append(smoothed)

# 슬라이딩 윈도우가 적용된 결과 확인
# 예: smoothed_predictions[0]는 조정된 prediction1의 결과를 포함
adjusted_first_prediction1 = smoothed_predictions[0]
adjusted_first_prediction2 = smoothed_predictions[1]
adjusted_first_prediction3 = smoothed_predictions[2]

# 조정된 예측 결과가 특정 임계값을 넘는지 체크하는 로직
threshold = 0.5  # 임계값 설정
exceeds_threshold1 = [pred > threshold for pred in adjusted_first_prediction1]
exceeds_threshold2 = [pred > threshold for pred in adjusted_first_prediction2]
exceeds_threshold3 = [pred > threshold for pred in adjusted_first_prediction3]

print(exceeds_threshold1)
print(exceeds_threshold2)
print(exceeds_threshold3)

# exceeds_threshold1의 True, False 개수 계산
true_count1 = sum(exceeds_threshold1)
false_count1 = len(exceeds_threshold1) - true_count1

# exceeds_threshold2의 True, False 개수 계산
true_count2 = sum(exceeds_threshold2)
false_count2 = len(exceeds_threshold2) - true_count2

# exceeds_threshold3의 True, False 개수 계산
true_count3 = sum(exceeds_threshold3)
false_count3 = len(exceeds_threshold3) - true_count3

# 결과 출력
print(f'exceeds_threshold1 - True: {true_count1}, False: {false_count1}')
print(f'exceeds_threshold2 - True: {true_count2}, False: {false_count2}')
print(f'exceeds_threshold3 - True: {true_count3}, False: {false_count3}')