const cloudinaryImage = (data) => {
    return data.replaceAll(
        'http://tower.tail4fb51.ts.net:8055/assets',
        'https://res.cloudinary.com/elsmore-me/image/upload/elsmore.me/'
    );
}
export { cloudinaryImage };
export default cloudinaryImage;
