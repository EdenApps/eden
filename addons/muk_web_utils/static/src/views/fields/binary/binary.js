import { url } from '@web/core/utils/urls';
import { patch } from '@web/core/utils/patch';
import { exprToBoolean } from '@web/core/utils/strings';
import { useFileViewer } from '@web/core/file_viewer/file_viewer_hook';

import { BinaryField, ListBinaryField, listBinaryField } from '@web/views/fields/binary/binary_field';

patch(BinaryField.prototype, {
    setup() {
        super.setup();
        this.fileViewer = useFileViewer();
    },
    get isText() {
        const textExtensions = [
            '.js',
            '.json',
            '.css',
            '.html',
            '.txt',
        ];
        return textExtensions.some(
            ext => this.fileName.toLowerCase().endsWith(ext)
        );
    },
    get isPdf() {
        return this.fileName.endsWith('.pdf');
    },
    get isImage() {
        const imageExtensions = [
            '.bmp',
            '.gif',
            '.jpg',
            '.jpeg',
            '.png',
            '.svg',
            '.tif',
            '.tiff',
            '.ico',
            '.webp'
        ];
        return imageExtensions.some(
            ext => this.fileName.toLowerCase().endsWith(ext)
        );
    },
    get isVideo() {
        const videoExtensions = [
            '.mp3',
            '.mkv',
            '.mp4',
            '.webm',
        ];
        return videoExtensions.some(
            ext => this.fileName.toLowerCase().endsWith(ext)
        );
    },
    get isViewable() {
        return (
            this.isText || 
            this.isImage || 
            this.isVideo || 
            this.isPdf
        );
    },
    onFilePreview() {
        const binaryUrl = url(
            this.isImage ? 
            `/web/image/${this.props.record.resId}` : 
            `/web/content/${this.props.record.resId}`, 
            {
                model: this.props.record.resModel,
                id: this.props.record.resId,
                field: this.props.name,
                filename_field: this.fileName,
                filename: this.fileName || '',
            }
        );
        const fileModel = {
            isText: this.isText,
            isPdf: this.isPdf,
            isImage: this.isImage,
            isVideo: this.isVideo,
            isViewable: this.isViewable,
            displayName: this.fileName || '',
            defaultSource: binaryUrl,
            downloadUrl: binaryUrl,
        };
        this.fileViewer.open(fileModel);
    }
});

patch(ListBinaryField, {
    props: {
        ...ListBinaryField.props,
        noLabel: { type: Boolean, optional: true },
    },
    defaultProps: {
        ...ListBinaryField.defaultProps,
        noLabel: false,
    },
});

patch(listBinaryField, {
    extractProps({ attrs }) {
        const props = super.extractProps(...arguments);
        props.noLabel = exprToBoolean(attrs.nolabel);
        return props;
    },
});

