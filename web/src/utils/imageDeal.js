// imageUtils.js
/**
 * 图片压缩工具函数
 * @param {File} file - 用户上传的文件对象
 * @param {number} [quality=0.7] - 压缩质量，范围 0 到 1，默认 0.7
 * @returns {Promise<File>} 压缩后的文件对象
 */
export const compressImage = (file, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        // 创建一个FileReader对象，用于读取文件
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            try {
                // 创建图片对象，用于加载图片数据
                const img = new Image();
                img.onload = () => {
                    // 创建Canvas元素，用于绘制和压缩图片
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // 设置Canvas的宽度和高度与图片相同，以保持精度
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // 将图片绘制到Canvas上
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // 调整图片质量进行压缩，并转换为Blob对象
                    canvas.toBlob((blob) => {
                        // 将Blob转换为File对象，并保留原始文件名和类型
                        const compressedFile = new File([blob], file.name, { type: file.type });
                        resolve(compressedFile);
                    }, file.type, quality);
                };
                img.src = e.target.result;
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};
