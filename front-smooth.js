applySeoMeta({
            title: `${detailTitleBase} - ${CONFIG.SITE_NAME}`,
            description: detailDescription,
            keywords: detailKeywords,
            image: detailImage,
            url: detailUrl,
            type: 'article'
        });

		const bodyHtml = contentData.map((text, i) => {
			const imgUrl = (imagesData && imagesData[i]) ? (imagesData[i].url || imagesData[i]) : "";
			const imgTag = imgUrl ? `<img src="${imgUrl}" alt="${cleanTitle}" style="width:100%; max-width:600px; height:auto; border-radius:8px; margin: 15px 0;" loading="lazy">` : "";
			return `<p>${text}</p>${imgTag}`;
		}).join('');
		
        // OPTIMASI: Render Backlinks dan Related secara langsung (tanpa document.getElementById lagi)
        const backlinksHtml = (resBacklinks && resBacklinks.data) 
            ? resBacklinks.data.map(l => `<a href="${l.url}" target="_blank" style="margin-right:10px; color:#0088cc;">${toTitleCase(l.keyword)}</a>`).join('• ')
            : '';

        const relatedHtml = (resRelated && resRelated.data)
            ? resRelated.data.slice(0, 25).map(item => `
                <dl class="listNews" style="margin-bottom:15px; padding-bottom:10px; border-bottom: 1px solid #f0f0f0;">
                    <small class="text-muted" style="font-size:11px;">${formatUTCDate(item.created_at)}</small>
                    <dt style="font-size:14px; margin-top:3px;">
                        <a href="${getLink(item.slug, 'askme')}" style="color:#086cab; text-decoration:none;">${toTitleCase(item.keyword)}</a>
                    </dt>
                </dl>`).join('')
            : '';

        const detailHtml = `<div class="row">
                <div class="col-sm-8">
                    <article class="newsContent">
                        <h1 style="font-size: 24px; line-height: 1.3; font-weight:bold; margin-top:0;">${cleanTitle}</h1>
                        <small class="text-muted">${pubDate}</small>
                        <hr>
                        <div>${bodyHtml}</div>
                        
                        ${backlinksHtml ? `
                        <div style="margin-top: 40px; font-size: 16px; padding:5px; background:#fff; border-radius:8px;">
							<h3 class="sidebar-title" style="border-left:4px solid #333; padding-left:10px; font-weight:bold; margin-bottom:15px; font-size:1.2em;">Recommended</h3>
							<div style="line-height:2;">${backlinksHtml}</div>
						</div>` : ''}
                    </article>
                </div>
                <aside class="col-sm-4">
                    <div id="ads-320x50" style="width:320px; height:50px; margin-bottom:30px; background:#f0f0f0; display:flex; align-items:center; justify-content:center; color:#999; border-radius:8px; margin-left:auto; margin-right:auto;"></div>
					
                    ${relatedHtml ? `
                    <h2 class="sidebar-title" style="font-weight:bold; border-bottom:2px solid #333; padding-bottom:10px; margin-bottom:20px; font-size:1.5em;">Related Posts</h2>
					<div>${relatedHtml}</div>
                    ` : ''}
                </aside>
            </div>`;

        // Render utuh 1x jalan, DOM tidak berkedip mencari id element lagi
        document.body.innerHTML = wrapInLayout(detailHtml);
    };
