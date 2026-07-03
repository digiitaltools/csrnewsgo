const injectIframeAd = (containerId, key, width, height) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    const iframe = document.createElement('iframe');
    
    Object.assign(iframe, {
        width: width, 
        height: height, 
        frameBorder: "0", 
        scrolling: "no"
    });
    
    iframe.style.cssText = "display: block; margin: 0 auto;";
    
    iframe.srcdoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; background:transparent; overflow:hidden; }
            </style>
        </head>
        <body>
            <script type="text/javascript">
                window.atOptions = {
                    'key' : '${key}',
                    'format' : 'iframe',
                    'height' : ${height},
                    'width' : ${width},
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
        </body>
        </html>
    `;
    
    container.appendChild(iframe);
};

const lazyLoadAd = (containerId, injectFn) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                injectFn();
                obs.disconnect(); 
            }
        });
    }, { rootMargin: '100px 0px' }); 

    observer.observe(container);
};

const showMyAds = () => {
    setTimeout(() => {
        const popup = document.getElementById('popup-ads-container');
        if (popup) popup.style.display = 'flex';
        injectIframeAd('ads-placeholder', '9a27691f9ee5bacbbc3ebd62ce872b42', 300, 250);
    }, 100);
};

const fillHomeAds = () => {
    lazyLoadAd('top-home-ads', () => {
        injectIframeAd('ads-728x90', 'ad96fd527d254b95f7209dc5b998c873', 728, 90);
    });
};

const fillDetailAds = () => {
    lazyLoadAd('ads-320x50', () => {
        injectIframeAd('ads-320x50', '8daadd7988cafd5a0bc5a2c36a49dd01', 320, 50);
    });
};
