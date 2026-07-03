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
            <script type="text/javascript" src="https://anguishgrandpa.com/${key}/invoke.js"></script>
        </body>
        </html>
    `;
    
    container.appendChild(iframe);
};

const showMyAds = () => {
    setTimeout(() => {
        const popup = document.getElementById('popup-ads-container');
        if (popup) {
            popup.style.display = 'flex';
            // Injeksi iklan popup 300x250
            injectIframeAd('ads-placeholder', 'a215683d2d0ce8fecd54e01b99606d75', 300, 250);
        }
    }, 100);
};

const fillHomeAds = () => {
    injectIframeAd('ads-728x90', '6bc878b50f4ca4fe0f9f00a24603655f', 728, 90);
};

// Detail 320x50
const fillDetailAds = () => {
    injectIframeAd('ads-320x50', '659b04a20a0861b7619a7103d607c7d3', 320, 50);
};


// --- Direct (Dibiarkan jika nanti ingin diaktifkan) ---
// const direct = () => {
//     document.body.onclick = function() {
//         window.open('https://www.effectivegatecpm.com/duvu4mhj?key=e2aac116fbcba2916a52a211c0018869', '_blank');
//         document.body.onclick = null;
//     };
// };
	
// --- Histats Tracking Code (Dibiarkan jika nanti ingin diaktifkan) ---
// const initHistats = () => {
//     window._Hasync = window._Hasync || [];
//     window._Hasync.push(['Histats.start', '1,4923600,4,0,0,0,00010000']);
//     window._Hasync.push(['Histats.fasi', '1']);
//     window._Hasync.push(['Histats.track_hits', '']);
//     (function() {
//         var hs = document.createElement('script'); 
//         hs.type = 'text/javascript'; 
//         hs.async = true;
//         hs.src = ('//s10.histats.com/js15_as.js');
//         (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
//     })();
// };
