import ImageTool from "@editorjs/image";

export default class CustomImageTool extends ImageTool {
    uploadByFile(file) {
        const formData = new FormData();
        formData.append('file', file); // Use 'file' as the field name
        
        //@ts-ignore
        return fetch(this.config.endpoints.byFile, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.image_url) {
                    console.log(data)
                    return {
                        success: 1,
                        file: {
                        url: data.url,
                        },
                    };
                } else {
                    return {
                        success: 0,
                        error: 'Failed to upload image',
                    };
                }
          })
          .catch((error) => {
                console.error('Error uploading image:', error);
                return {
                success: 0,
                error: 'Failed to upload image',
                };
          });
        }
}