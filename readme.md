# Craft Website Boilerplate

## Installation

1. Download a fresh copy of the [boilerplate](https://thepinkboa.codebasehq.com/projects/paramore/repositories/boilerplate-craft-website/tree/master) before starting a new site.

2. Install gulp globally if you haven't already done so.  
`$ npm install --global gulp`

3. Go into the _vhosts_ folder and rename "domain.com" to the actual domain of the site you are building.

4. Open .bowerrc
  1. Change "domain.com" to the site's domain

5. Open bower.json
  1. Change "domain" to the site's domain name. Feel free to install any additional dependencies and remove unused ones

6. Open package.json
	1. Change "domain" to the site's domain name
	2. Description and URL are optional
	3. Find `path` and update "domain.com" to the site's domain

7. Install Bower components into the root of your project  
`$ bower install`

8. Install dev dependencies into the root of your project  
`$ npm install`

9. Run `$ gulp` (default task) to watch for changes and automatically refresh across devices; press `Ctrl-c` to stop.

## EditorConfig

EditorConfig helps us define and maintain consistent coding styles between different editors and IDEs. [Download](http://editorconfig.org/#download) and install the EditorConfig plugin for your editor.

## Building Files

Run `$ gulp build` to build and optimize the current project and create deployment-ready files. This includes linting as well as image, script and stylesheet optimization and minification. Build files are excluded from the repository, so running this task locally is mostly for performance checking / testing.

The environment-specific tasks, `$ gulp testing`, `$ gulp staging` and `$ gulp production`, will run the build process automatically on deployment. Deployments should be configured to fail if an error occurs.

## Live Reloading / Device Synchronization

Live browser reloading occurs when a watched file is saved. This is accomplished with [BrowserSync](http://www.browsersync.io/).

To take advantage of device synchronization, go into MAMP and under the site's settings, set the IP / Port to 10.1.10.xxx. The IP address should be that of your computer. Visit the site on any device at that IP to sync up. You'll need to navigate to the same page on your device as you are on your computer.

[View MAMP Settings Screenshot](http://cl.ly/image/0s0Y0j432U3G/mamp.png)

## Writing CSS

Don't use Sass mixins to create vendor prefixed CSS3 properties because [Autoprefixer](https://github.com/postcss/autoprefixer) will do it for you.

## SVGs

SVGs should be used with PNG fallbacks if you're building for IE 8. All SVG files should exist in _assets/src/images_. SVGs are watched as part of the default gulp task (`$ gulp`) to minify and create PNG fallbacks, but you can also run `$ gulp svg` independently.

### Using SVGs

#### 1. Include SVG in CSS

`path` function is optional but helpful.

```scss
.class {
  background-image: path(image-name.svg);
}
```

#### 2. Sass Mixin to Create PNG fallback

For IE 8 support, use the Sass mixin in your code.

```scss
.class {
  @include svg-with-png('image-name'); // Omit prefix
}
```

Which will output the following CSS:

```css
.class {
  background-image: url(../svg/image-name.svg);
}

.no-svg .class {
  background-image: url(../images/image-name.png);
}
```

#### 3. SVG Sprite

Include the sprite (usually once above the footer) and define each image as a `symbol`. This method allows you to alter the image via CSS (typically the `path` attribute).

`hidden` can be replaced with `class="hidden"` if desired.

```html
<svg xmlns="http://www.w3.org/2000/svg" hidden>
  <defs>
    <symbol id="facebook" viewBox="0 0 10 18">
      <path d="M10 3.1H7.1c-.3 0-.7.4-.7
        1v2.1H10v2.9H6.4V18H3.1V9.2H0v-3h3.1V4.5C3.1 2 4.8 0 7.1 0H10v3.1z" />
    </symbol>
  </defs>
</svg>
```

Use the sprite. The IE conditional comment is optional; use it if you support IE 8.

```html
<svg class="facebook">
  <use xlink:href="#facebook" />
</svg>
<!--[if lt IE 9]><img src="/dist/images/facebook.png" alt="facebook icon"><![endif]-->
```

#### 4. Inline the SVG

This method allows you to alter the image via CSS (typically the `path` attribute).

```html
<div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 18">
    <path d="M10,3.1H7.1c-0.3,0-0.7,0.4-0.7,1v2.1H10v2.9H6.4V18H3.1V9.2H0V6.2h3.1V4.5C3.1,2,4.8,0,7.1,0H10V3.1z" />
  </svg>
</div>
```

#### 5. Icon Fonts

Using icon fonts for simple SVG's allows you to use the icon as a font, with all font manipulation available to you (font-size, color, etc). Use Fontello.com to create your icon font set. Fontello gives you the option to choose specific icons, and also allows you to upload custom icons as SVGs to include them in your font set. 

```html
<i class="icon-arrow-up"></i>
```

## Linting

The gulpfile includes code linters for SCSS and JavaScript to check for proper code style and formatting. Any linting errors should not be ignored and addressed immediately. We have our own config which was adapted from [Airbnb's JavaScript style guide](https://github.com/airbnb/javascript).

Code linting will be run as SCSS and JS files are being watched for changes, but you can also run `$ gulp lint` independently to lint the files.

**NOTE:** For SCSS linting, you need to install the gem.  
`$ gem install scss-lint`

## robots.txt

The enironment-specific robots.txt file is created with gulp when deployed. Both files should exist in the root. Gulp will then copy and rename the file.

**This means that we no longer need an SSH command in Deploy.**

## Configure Environment Variables

Go to _vhosts/domain.com/index.php_ and configure the environments.

```
array(
    'local'      => array('127.0.0.1', '10.1.10.xxx'),
    'dev'        => array('10.1.10.11'),
    'staging'    => array('74.94.252.74'),
    'production' => array('xxx'),
)
```

## Configure Database Variables

Go to _craft/config/db.php_ and configure the database.

Where it says `'database' => 'domain_craft'`, make sure you change "domain_" to the actual domain.

## Configure `siteURL`

Go to _craft/config/general.php_ and update the `siteURL` for each environment.

## Icons

Each site needs three icons: **favicon.ico**, **apple-touch-icon.png** and **share-image.jpg**.

| Icon                 | Size      | Purpose        |
|----------------------|-----------|----------------|
| favicon.ico          | 32 x 32   | Bookmark       |
| apple-touch-icon.png | 152 x 152 | Touch devices  |
| share-image.jpg      | 800 x 800 | Social sharing |

Have a designer create these icons if you cannot.

Change the tile color to match the background color of the **apple-touch-icon.png**.

```
<meta name="msapplication-TileColor" content="#222222">
```

Let this be one of the first things you do so you don't forget later.

## Schema.org

Use the appropriate schema type for the website. [http://schema.org/](http://schema.org/)

You'll find the schema type in the `html` element in the `itemtype` property:

```
<html class="no-js" lang="en-US" itemscope itemtype="http://schema.org/WebSite">
```

where "WebSite" would be changed to the appropriate type.

For example, Capstar's schema type would be "LocalBusiness" whereas Frist's schema type would be "Museum".

The address in the footer should be marked up with Schema as well. Here's an example. Note the `Organization` wrapper is optional.

```html
<div itemscope itemtype="http://schema.org/Organization">
  <div itemprop="name">Organization Name</div>

  <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
    <div itemprop="name">Organization Name</div>
    <div itemprop="streetAddress">1234 Foo St.</div>
    <div itemprop="streetAddress">Suite 100</div>

    <div>
      <span itemprop="addressLocality">Nashville</span>,
      <span itemprop="addressRegion">TN</span>
      <span itemprop="postalCode">37219</span>
    </div>
  </div>

  <div>
    <a href="email@domain.com" itemprop="email">
      {{ contact.emailAddress }}
    </a>

    <br>

    <a href="+16158675309" itemprop="telephone">
      867-5309
    </a>

    <span itemprop="faxNumber">
      867-5308
    </span>
  </div>
</div>
```

Some sites may require additional Schema markup for things like products and events. Please refer to Adventures on the Gorge for examples.

## Craft Resources

- [Official Documentation](http://buildwithcraft.com/docs/introduction)
- [Straight Up Craft](http://straightupcraft.com/)
- [Craft Plugins](http://straightupcraft.com/craft-plugins)
- [Craft Cookbook](http://craftcookbook.net/)
- [Craft CMS on Stack Exchange](http://craftcms.stackexchange.com/)
- [Twig Documentation](http://twig.sensiolabs.org/documentation)
