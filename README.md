# Darth's Hugo shortcodes
A collection of Hugo shortcodes that you can use in any theme.

Hugo supports shortcodes for repeatable content or rendering content from SaaS sites. They are formatted as `{{< shortcode parameter1 parameter2 >}}` and will make anything from a GitHub Gist to a YouTube video appear embedded in your page.

**I strongly recommend against over-reliance on shortcodes for embedding externally-hosted content, as they will be prone to [link rot](https://en.wikipedia.org/wiki/Link_rot).** If possible, prefer an image with a hyperlink, e.g. video thumbnail + hyperlink to video, or screenshot of Twitter post + hyperlink. Thus, once the target disappears, future readers will still have some idea what the linked content was. 

The folder structure should be self-explanatory, and you can add these directly to Hugo sites or themes. If you add them to your theme, please link back to this repo in visible credits.

## Screenshot
![screenshot](screenshot.png)

## Included shortcodes
- [PodBean](https://www.podbean.com/)
- [HearThis.at](https://hearthis.at/)
- [Deezer](https://www.deezer.com/br/)
- [Spotify](https://open.spotify.com/)

## Usage

### Recommended
1. Download and extract ZIP (**offline**) or git clone submodule (**online**) into `\yourHugoWebsite\themes\`
2. Edit your site's `config.toml` so that its `[params]` are `theme = ["mainTheme", "darths-hugo-shortcodes"]`
	- Yes, you need to use another main theme alongside this. These shortcodes are just to add capabilities to other themes .
3. Copy the contents of `\exampleSite\` to your site's root, and see the examples (you can also read the shortcodes' HTML to for additional details).
4. Call the shortcodes when desired in your site's content via `{{< shortcode parameter1 ... >}}`

### Manually
Copy the contents of `\layouts\shortcodes\` into the equivalent folder in your website root or theme root.

## TODO
- ~~Make this a partial Hugo theme/module, kinda like [Hugo Easy Gallery](https://github.com/Darthagnon/hugo-easy-gallery)?~~
- Add more detailed example documentation (copy from HTML)
- More shortcodes:
	- Embeddable RSS feed
	- Magic: the Gathering hovercards (via Scryfall and TappedOut APIs?)
	- Embeddable Google Forms (and alternatives, e.g. Formspree)
	- Embeddable local JS MP3 player (where did I see that good one?!)
	- Embeddable PDF.js
	- Embeddable [OpenSea NFTs](https://docs.opensea.io/docs/embeds)
	- Advanced image embedding (alignment etc.) than Hugo's Markdown default
	- Embeddable Soundcloud
	- Embeddable arbitrary website iframe
- See also official [Hugo documentation](https://gohugobrasil.netlify.app/templates/shortcode-templates/)
- ... and their [recommended examples](https://github.com/spf13/spf13.com/tree/master/layouts/shortcodes)
