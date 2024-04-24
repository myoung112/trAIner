import tensorflow as tf
import os

print("TensorFlow 버전:", tf.__version__)
print("GPU 사용 가능:", tf.test.is_gpu_available())

base_dir = 'cnn_data'

train_dir = os.path.join(base_dir, 'train')
valid_dir = os.path.join(base_dir, 'validation')
test_dir = os.path.join(base_dir, 'test')

print("훈련 데이터 경로:", train_dir)
print("검증 데이터 경로:", valid_dir)
print("테스트 데이터 경로:", test_dir)
