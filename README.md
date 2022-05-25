# Darth's Hugo shortcodes
A collection of Hugo shortcodes that you can use in any theme.

Hugo supports shortcodes for repeatable content or rendering content from SaaS sites. They are formatted as `{{< shortcode parameter1 parameter2 >}}` and will make anything from a GitHub Gist to a YouTube video appear embedded in your page.

** I strongly recommend against over-reliance on shortcodes for embedding externally-hosted content, as they will be prone to [link rot](https://en.wikipedia.org/wiki/Link_rot).** If possible, prefer an image with a hyperlink, e.g. video thumbnail + hyperlink to video, or screenshot of Twitter post + hyperlink. Thus, once the target disappears, future readers will still have some idea what the linked content was. 

The folder structure should be self-explanatory, and you can add these directly to Hugo sites or themes. If you add them to your theme, please link back to this repo in visible credits.

## Included shortcodes
- [PodBean](https://www.podbean.com/)
- [HearThis.at](https://hearthis.at/)
- [Deezer](https://www.deezer.com/br/)
- [Spotify](https://open.spotify.com/)

## TODO
- Make this a partial Hugo theme/module, kinda like [Hugo Easy Gallery](https://github.com/Darthagnon/hugo-easy-gallery)?
- See also official [Hugo documentation](https://gohugobrasil.netlify.app/templates/shortcode-templates/)
- ... and their [recommended examples](https://github.com/spf13/spf13.com/tree/master/layouts/shortcodes)
