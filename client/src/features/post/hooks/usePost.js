import { useState } from 'react';
import { createPost } from '../api/postService';
import { showSuccessToast, showErrorToast } from '../../../shared/utils/toast';

export function usePost() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [posts, setPosts] = useState([]);

    const submitPost = async (formData) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await createPost(formData);

            if (response.success) {
                showSuccessToast(response.message);
                return response;
            } else {
                throw new Error(response.message || '게시글 작성에 실패했습니다.');
            }
        } catch (error) {
            showErrorToast(error.message || '네트워크 오류가 발생했습니다.');
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    // const getPosts = async (mention) => {
    //     try {
    //         const data = await getUserPosts(mention);
    //         console.log(`게시글: ${data}`);
    //         setPosts(data);
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }

    return {
        // posts,
        submitPost,
        isSubmitting
    };
}