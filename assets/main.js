const url = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLRe9ARNnYSY7Jx8wf4snN1l3djMoT_fst&part=snippet&maxResults=10';

const content = document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'ac7adbb50bmsh8958f83af9560c6p190f34jsne8cd6902946f',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(url);
        if (content) {
            let view = `
            ${videos.items.map(video => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none"
                >
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div>
            </div>
                `).slice(0, 4).join('')}
            `;
            content.innerHTML = view;
        } else {
            console.error('Content element not found');
        }
    } catch (error) {
        console.log(error);
    }
})()