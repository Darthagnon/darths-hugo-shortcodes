# Darth's Hugo shortcodes
A collection of Hugo shortcodes that you can use in any theme.

Hugo comes with shortcodes for YouTube, Vimeo, Twitter,  Instagram, GitHub Gist, and a few internal functions (detailed images, relative URLs). They are used for repeatable content or rendering content from SaaS sites. They are formatted as `{{< shortcode parameter1 parameter2 >}}` and will make anything from a GitHub Gist to a YouTube video appear embedded in your page.

This project aims to add a bunch more for popular services (initially focusing on podcasts/music) via `iframe` widget embeds, so that Hugo theme developers don't need to reinvent the wheel for every theme.

**I strongly recommend against over-reliance on shortcodes for embedding externally-hosted content, as they will be prone to [link rot](https://en.wikipedia.org/wiki/Link_rot).** If possible, prefer an image with a hyperlink, e.g. video thumbnail + hyperlink to video, or screenshot of Twitter post + hyperlink. Thus, once the target disappears, future readers will still have some idea what the linked content was. 

The folder structure should be self-explanatory, and you can add these directly to Hugo sites or themes. If you add them to your theme, please link back to this repo in visible credits.

## Screenshot
![screenshot](screenshot.png)

## Included shortcodes
- [PodBean](https://www.podbean.com/)
- [HearThis.at](https://hearthis.at/)
- [Deezer](https://www.deezer.com/br/)
- [Spotify](https://open.spotify.com/)
- [Imgur](https://help.imgur.com/hc/en-us/articles/211273743-Embed-Unit)

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
	- Magic: the Gathering hovercards (via Scryfall and TappedOut APIs?)
	- ~~Embeddable Google Forms and Docs/Drive~~ (and alternatives, e.g. Formspree)
	- Embeddable local JS MP3 player (where did I see that good one?!)
	- Embeddable PDF.js (~~embeddable PDFs from Google Drive~~)
	- Embeddable [OpenSea NFTs](https://docs.opensea.io/docs/embeds)
	- Advanced image embedding (alignment etc.) than Hugo's Markdown default
	- Embeddable Soundcloud
	- ~~Imgur~~
	- OpenSea NFTs (only point is to show them off)
	- Telegram
	- Discord Guild badge/memberlist widget
	- Unsplash
	- Thingiverse
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
- **Possibly better implemented per-site theme?**
	- [Google ads?](https://support.google.com/adsense/answer/9190028?hl=en)
	- Matrix for comments or livechat? [Might](https://live.hello-matrix.net/generate.html) or [might not](https://github.com/vector-im/element-web/issues/6078) be possible to embed, or it might be 
	- [Cactus.chat comments](https://cactus.chat/docs/integrations/hugo/) (Matrix-based), seems a very good idea thanks to Matrix bridging and federation.
	- Mastodon comments and alternatives? If I ever get this far, might as well include all common comments systems haha (https://news.ycombinator.com/item?id=25570268)

## Further Reading
- See also official [Hugo documentation](https://gohugobrasil.netlify.app/templates/shortcode-templates/)
- ... and their [recommended examples](https://github.com/spf13/spf13.com/tree/master/layouts/shortcodes)
- See also official [Hugo documentation](https://gohugobrasil.netlify.app/templates/shortcode-templates/) (and also on the [official English site](https://gohugo.io/templates/shortcode-templates/))
- ... and their [recommended examples from spf13.com](https://github.com/spf13/spf13.com/tree/master/layouts/shortcodes)
- [The shortcodes directory for the Hugo docs](https://github.com/gohugoio/hugo/tree/master/docs/layouts/shortcodes)
- Hugo also ships with built-in shortcodes for common use cases. (See [Content Management: Shortcodes](https://gohugo.io/content-management/shortcodes/).)
- Look in `/layouts/shortcodes` in your favourite or most-feature-heavy themes, there are good shortcodes there, too, but it is inefficient to implement shortcodes for 1 theme only
