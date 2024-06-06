async function handleLike(event) {
      
    event.preventDefault(); // Prevent default form submission behavior
    const button = event.currentTarget;
    const postId = button.getAttribute('data-postid');
    const scrollPosition = window.scrollY; // Store current scroll position

    try {
        const response = await fetch(`/like/${postId}`, { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            // Update like count on success
            const likeCountElement = button.querySelector('.like-count');
            if (likeCountElement) {
                const newLikeCount = data.likesCount; // Assuming the response returns the updated like count
                likeCountElement.textContent = newLikeCount;
            }
            // Scroll back to the stored position
            window.scrollTo(0, scrollPosition);
            location.reload()
        } else {
            console.error('Failed to like post');
        }
    } catch (error) {
        console.error('Error occurred while liking post', error);
    }

}

// Attach click event listener to all like buttons
const likeButtons = document.querySelectorAll('.likeButton');
likeButtons.forEach(button => {
    button.addEventListener('click', handleLike);
});
