<template>
    <quill-editor :content="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @change="onEditorChange($event)">
    </quill-editor>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {quillEditor} from 'vue-quill-editor'

    export default {
        name: "QEditor",
        components: {
            quillEditor
        },
        data() {
            return {
                content: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            // [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{'direction': 'rtl'}],
                            // [{ 'size': ['small', false, 'large', 'huge'] }],
                            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            // [{ 'font': [] }],
                            // [{ 'color': [] }, { 'background': [] }],
                            [{'align': []}],
                            ['link', 'image']
                        ],
                    },
                    placeholder: '输入...',
                },
            }
        },
        methods: {
            onEditorChange({quill, html, text}) {
                // 向父组件传值
                this.content = html;
                this.$emit('func', this.content)
            },
            childMethod(data) {
                // 接受父组件传值
                this.content = data;
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        }
    }
</script>

<style>
    .quill-editor .ql-toolbar.ql-snow .ql-formats .ql-icon-picker .ql-picker-label {
        position: absolute;
        top: -13px;
    }
</style>
