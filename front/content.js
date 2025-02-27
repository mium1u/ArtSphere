$(document).ready(function() {
    // Get content ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const contentId = urlParams.get('id');

    if (contentId) {
        // Fetch content data from the server using the specific content ID
        $.ajax(`http://localhost:5000/api/content/${contentId}`, {
            success: function(data) {
                $('.title-post').text(data.c_name);
                $('.title-post-category').text(data.n_category);
                $('.creator a').text(data.username);
                $('.post-main-img').attr('src', `D:/0/library/static/form/${data.img}`);

                // Add video if link is available
                if (data.link !== 'none') {
                    addVideo(data.link);
                }

                $('.note-t').text(data.c_description);
            },
            error: function() {
                alert('Failed to load content');
            }
        });
    } else {
        alert('No content ID specified');
    }

    // Function to add video
    function addVideo(videoLink) {
        // If the video link is not 'none', embed the video
        if (videoLink !== 'none') {
            // Extract video ID from the link
            const videoId = extractVideoId(videoLink);
            // Construct the embed URL for YouTube video
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    
            // Create an iframe element for the video
            const videoFrame = $('<iframe></iframe>', {
                width: '100%',
                maxWidth: '650',
                height: '350',
                src: embedUrl, // Use the embed URL
                title: 'YouTube video player',
                frameborder: '0',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                css: {
                    'border-radius': '30px'
                }
            });
    
            // Append the video frame to the designated container
            $('.cont-w').append(videoFrame);
        }
    }
    
    // Function to extract video ID from the YouTube video link
    function extractVideoId(videoLink) {
        // Extract the video ID from the link
        const videoId = videoLink.split('v=')[1];
        // If there's an additional parameter in the URL, remove it
        if (videoId.includes('&')) {
            return videoId.split('&')[0];
        }
        return videoId;
    }
});
