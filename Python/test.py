import tensorflow as tf
print("TensorFlow version:", tf.__version__)
if tf.test.gpu_device_name():
    print("GPU available:", tf.test.gpu_device_name())
else:
    print("No GPU available.")