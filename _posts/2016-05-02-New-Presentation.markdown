---
layout:     	slide
title:     		New Presentation
author:     	Ahmet Cecen
tags:           presentation template
subtitle:    	Some Short Description of Presentation

theme:		night # default/beige/blood/moon/night/serif/simple/sky/solarized
trans:		default # default/cube/page/concave/zoom/linear/fade/none

horizontal:	</section></section><section markdown="1" data-background="http://projectpages.github.io/project-pages/img/slidebackground.png"><section markdown="1">
vertical:		</section><section markdown="1">
---
<section markdown="1" data-background="http://projectpages.github.io/project-pages/img/slidebackground.png"><section markdown="1">
## {{ page.title }}

<hr>

#### {{ page.author }}

#### {{ page.date | | date: "%I %M %p ,%a, %b %d %Y"}}

{{ page.horizontal }}
<!-- Start Writing Below in Markdown -->

## F11 to Fullscreen!

Showcasing Presentation Features. This template is ideal for very quickly creating decent presentations when content and simplicity is more important than excessive styling. 

{{ page.horizontal }}

Seperate with {% raw  %}{{ page.horizontal }}{% endraw %} between content for horizontal slides.

{{ page.vertical }}

Seperate with {% raw  %}{{ page.vertical }}{% endraw %} between content for vertical slides.

{{ page.horizontal }}

Press ESC for a zoomed out overview of the presentation.

{{ page.horizontal }}

Press B to pause the presentation.

{{ page.horizontal }}

# Header 1

## Header 2

### Header 3

{{ page.horizontal }}

# Styling

**Bold**

*Italics*

***Bold and Italics***

{{ page.horizontal }}

Use MathJax for Math.

$$ A = \pi r^2 $$

{{ page.horizontal }}

# Lists

1. Item 1

2. Item 2

3. Item 

{{ page.horizontal }}

# Links

[In-Line](https://www.google.com)

[I'm a reference-style link 1][1]

[I'm a reference-style link 1][2]

[1]:https://www.mozilla.org
[2]:http://www.reddit.com

{{ page.horizontal }}

# Images

Alt-Click to zoom.

![Description](http://projectpages.github.io/project-pages/img/Logo_Fairy_Tail_right.png)

{{ page.horizontal }}

# Code

Inline `code`.

{{ page.vertical }}

# Code Block

	import numpy as np
	def _set_colors():
    HighRGB = np.array([26, 152, 80]) / 255.

{{ page.horizontal }}

# Quotes

> War does not decide who is right, only who is **left**.

{{ page.horizontal }}

# HTML

Now, you CAN write in HTML using this template. If you want to create HTML presentations using this framework head over to [reveal.js](http://lab.hakim.se/reveal-js/#/) for reference.  For a power-point like interactive tool for creating presentations with this theme, check [slides.com](http://slides.com/).

{{ page.vertical }}

# Some HTML Functionality

## Color and Alignment

<p align="center">This text is centered.</p>

<p style="color:red">This is a red text with <span style="color:blue">blue</span> and <span style="color:green">green</span> inline text.</p>

{{ page.horizontal }}

## STL

<div align="center"><script src="https://embed.github.com/view/3d/projectpages/project-pages/gh-pages/stl/test.stl"></script></div>

{{ page.horizontal }}

## Data Projector

<embed src="/project-pages/2016/05/02/New-Projector/" height="500px" width="100%">

<!-- End Here -->
{{ page.horizontal }}

# [Print]({{ site.url }}{{ site.baseurl }}{{ page.url }}/?print-pdf#)

# [Back]({{ site.url }}{{ site.baseurl }})

</section></section>
