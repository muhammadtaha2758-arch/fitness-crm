<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // Authorization is handled in the controller
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'content' => 'required|string|max:5000',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:51200',
            'video' => 'nullable|file|mimes:mp4,mov,avi,webm|max:51200'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'content.required' => 'Post content is required.',
            'content.max' => 'Post content cannot exceed 5000 characters.',
            'image.file' => 'The image must be a valid file.',
            'image.mimes' => 'Image must be one of the following types: jpeg, png, jpg, gif, or webp.',
            'image.max' => 'Image size cannot exceed 50MB.',
            'video.file' => 'The video must be a valid file.',
            'video.mimes' => 'Video must be one of the following types: mp4, mov, avi, or webm.',
            'video.max' => 'Video size cannot exceed 50MB.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();
        $firstError = $errors->first();

        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => $firstError,
                'errors' => $errors->all(),
                'error_details' => $errors->toArray()
            ], 422)
        );
    }
}
