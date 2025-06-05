import * as api from '../api-reference';
import type { FileDropZonePropsWithoutHTML } from '$lib/components/ui/file-drop-zone/types';

const Root = api.createComponentReference<FileDropZonePropsWithoutHTML>({
  name: 'Root',
  description: 'The root file drop zone component.',
  props: {
    ref: api.createAnyProp({
      description: 'A reference to the input element.',
      bindable: true,
      type: 'HTMLInputElement',
      defaultValue: 'null'
    }),
    children: api.createAnyProp({
      description: 'The content to render inside the drop zone. If not provided, a default UI is shown.',
      type: 'Snippet'
    }),
    onUpload: api.createFunctionProp({
      description: 'Called with the uploaded files when the user drops or selects files.',
      type: '(files: File[]) => Promise<void>',
      required: true
    }),
    maxFiles: api.createNumberProp({
      description: 'The maximum number of files allowed to be uploaded.'
    }),
    fileCount: api.createNumberProp({
      description: 'The current number of files uploaded. Required if using maxFiles.'
    }),
    maxFileSize: api.createNumberProp({
      description: 'The maximum size of a file in bytes.'
    }),
    onFileRejected: api.createFunctionProp({
      description: 'Called when a file does not meet the upload criteria (size, or type).',
      type: '(opts: { reason: FileRejectedReason; file: File }) => void'
    }),
    accept: api.createStringProp({
      description: 'A comma separated list of one or more file types to accept. [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)\n\nExample: ".doc,.docx,application/msword"\nCommon: "audio/*", "image/*", "video/*"'
    })
  }
});

export const components = {
  Root
}; 