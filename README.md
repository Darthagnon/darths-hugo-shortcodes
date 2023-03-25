# Darth's Hugo shortcodes
A collection of Hugo shortcodes that you can use in any theme.

Hugo comes with shortcodes for YouTube, Vimeo, Twitter,  Instagram, GitHub Gist, and a few internal functions (detailed images, relative URLs). They are used for repeatable content or rendering content from SaaS sites. They are formatted as `{{< shortcode parameter1 parameter2 >}}` and will make anything from a GitHub Gist to a YouTube video appear embedded in your page.

This project aims to add a bunch more for popular services (initially focusing on podcasts/music) via `iframe` widget embeds, so that Hugo theme developers don't need to reinvent the wheel for every theme.

**I strongly recommend against over-reliance on shortcodes for embedding externally-hosted content, as they will be prone to [link rot](https://en.wikipedia.org/wiki/Link_rot).** If possible, prefer an image with a hyperlink, e.g. video thumbnail + hyperlink to video, or screenshot of Twitter post + hyperlink. Thus, once the target disappears, future readers will still have some idea what the linked content was. 

The folder structure should be self-explanatory, and you can add these directly to Hugo sites or themes. If you add them to your theme, please link back to this repo in visible credits.

## Release threads
**[GoHugo Discourse](https://discourse.gohugo.io/t/release-darths-hugo-shortcodes/38943)  |  [Reddit](https://www.reddit.com/r/gohugo/comments/v63kyu/release_a_collection_of_misc_3rd_party_shortcodes/)**

## Screenshot
![screenshot](screenshot.png)

## Included shortcodes
- [PodBean](https://www.podbean.com/)
- [HearThis.at](https://hearthis.at/)
- [Deezer](https://www.deezer.com/br/)
- [Spotify](https://open.spotify.com/)
- [Imgur](https://help.imgur.com/hc/en-us/articles/211273743-Embed-Unit)
- iCalendar embed (based off [GRA0007/modern-cal-embed](https://github.com/GRA0007/modern-cal-embed)) (local)

## Usage

### Recommended
1. Download and extract ZIP (**offline**) or git clone submodule (**online**) into `\yourHugoWebsite\themes\`
2. Edit your site's `config.toml` so that its `[params]` are `theme = ["mainTheme", "darths-hugo-shortcodes"]`
	- Yes, you need to use another main theme alongside this. These shortcodes are just to add capabilities to other themes.
3. Copy the contents of `\exampleSite\` to your site's root, and see the examples (you can also read the shortcodes' HTML to for additional details). Use it alongside your main theme!
4. Call the shortcodes when desired in your site's content via `{{< shortcode parameter1 ... >}}` or `{{< shortcode param="value" ... >}}`

### Manually
Copy the contents of `\layouts\shortcodes\` into the equivalent folder in your website root or theme root.

## TODO
- ~~Make this a partial Hugo theme/module, kinda like [Hugo Easy Gallery](https://github.com/Darthagnon/hugo-easy-gallery)?~~
- Add more detailed example documentation (copy from HTML)
- Add [alt text to all iframes](https://jkorpela.fi/html/iframe.html)
- **High priority shortcodes**:
	- Embeddable RSS feed
	- Embed funny console messages/debug messages
	- Christmas Snow FX
	- Birthday Balloons FX
	- Fork on Github overlay banner?
	- Magic: the Gathering hovercards (via Scryfall and TappedOut APIs?)
	- Magic: the Gathering and YuGiOh symbols via [Keyrune](https://keyrune.andrewgioia.com/), [Mana](https://mana.andrewgioia.com/) and wiki-collected YuGiOh symbols
	- ~~Embeddable Google Forms and Docs/Drive~~ (and alternatives, e.g. Formspree)
	- Embeddable local JS MP3 player ([APlayer + MetingJS](https://github.com/Runzelee/aplayer-hugo-module) is the good one)
	- Embed [Last.fm Recently Played](https://github.com/JeffreyCA/lastfm-recently-played-readme), as on [this website](https://im.youronly.one/yuki/)
	- Embeddable PDF.js using [PDFObject](https://pdfobject.com/) (~~embeddable PDFs from Google Drive~~)
	- Advanced image embedding (alignment etc.) than Hugo's Markdown default
	- Embeddable Soundcloud
	- ~~Imgur~~
	- ~~Embeddable [OpenSea NFTs](https://docs.opensea.io/docs/embeds) (only point is to show them off)~~ (done, but OpenSea's API is broken and [does not support Polygon NFTs](https://github.com/ProjectOpenSea/embeddable-nfts/issues/93))
	- Telegram
	- Discord Guild badge/memberlist widget
	- Unsplash
	- Thingiverse
	- Fix class attributes (put in "quotes", make them sensible)
	- [Google Maps](https://support.google.com/mymaps/answer/3024454) in a [privacy-friendly way](https://discourse.gohugo.io/t/embedding-google-maps-in-a-privacy-friendly-way/41575)
	- DocumentCloud ([Homepage](https://www.documentcloud.org/home), [GitHub](https://github.com/muckrock/documentcloud), [Legacy GitHub iframe src](https://github.com/documentcloud/documentcloud/blob/master/app/views/authentication/iframe.html.erb)) (see `view-source:https://embed.documentcloud.org/documents/22058315-is-lamda-sentient-an-interview/?embed=1&responsive=1&title=1` and [here](https://embed.documentcloud.org/help/tips#wordpress-tips))
	- M$ OneDrive/SharePoint document embeds
- **Low priority shortcodes**
	- Embeddable arbitrary website iframe ([not possible with all websites](https://stackoverflow.com/questions/7422300/checking-if-a-website-doesnt-permit-iframe-embed))
	- Gfycat
	- Flickr
	- Bandcamp (sale-focused, rather than listening-focused)
	- [Facebook?](https://developers.facebook.com/docs/plugins/)
	- [Etsy](https://www.etsy.com/widgets)
	- [Pinterest](https://developers.pinterest.com/tools/widget-builder/?), TikTok, Twitch (these are 💩 and I have no idea why anyone would use them)
	- [Paypal](https://www.paypal.com/buttons/)
	- [Patreon](https://www.patreon.com/dashboard/widgets)
	- [GoFundMe](https://support.gofundme.com/hc/en-gb/articles/203604554-Adding-a-GoFundMe-Widget-to-a-Blog-or-Website)
	- JSFiddle & Codepen (looks complicated)
	- Mastodon comments and alternatives? If I ever get this far, might as well include all common comments systems haha (https://news.ycombinator.com/item?id=25570268) - **[Bryce Wray has done something like this](https://www.brycewray.com/posts/2022/06/static-mastodon-toots-hugo/)**
	- SurveyMonkey (embedding requires a paid account) ([link 1](https://www.surveymonkey.com/curiosity/how-to-embed-your-survey-on-a-website/), [link 2](https://help.surveymonkey.com/en/send/website-collector/))
- **Possibly better implemented per-site theme?**
	- [Google ads?](https://support.google.com/adsense/answer/9190028?hl=en)
	- Matrix for comments or livechat? [Might](https://live.hello-matrix.net/generate.html) or [might not](https://github.com/vector-im/element-web/issues/6078) be possible to embed, or it might be 
	- [Cactus.chat comments](https://cactus.chat/docs/integrations/hugo/) (Matrix-based), seems a very good idea thanks to Matrix bridging and federation.
	

## Further Reading
- See also official [Hugo documentation](https://gohugobrasil.netlify.app/templates/shortcode-templates/)
- ... and their [recommended examples](https://github.com/spf13/spf13.com/tree/master/layouts/shortcodes)
- See also official [Hugo documentation](https://gohugobrasil.netlify.app/templates/shortcode-templates/) (and also on the [official English site](https://gohugo.io/templates/shortcode-templates/))
- ... and their [recommended examples from spf13.com](https://github.com/spf13/spf13.com/tree/master/layouts/shortcodes)
- [The shortcodes directory for the Hugo docs](https://github.com/gohugoio/hugo/tree/master/docs/layouts/shortcodes)
- Hugo also ships with built-in shortcodes for common use cases. (See [Content Management: Shortcodes](https://gohugo.io/content-management/shortcodes/).)
- [Hugo relative link shortcodes](https://gohugo.io/content-management/cross-references/)
- Look in `/layouts/shortcodes` in your favourite or most-feature-heavy themes, there are good shortcodes there, too, but it is inefficient to implement shortcodes for 1 theme only
