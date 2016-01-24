[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![npm version](https://badge.fury.io/js/aping-plugin-dailymotion.png)](https://badge.fury.io/js/aping-plugin-dailymotion)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-dailymotion.png)](https://badge.fury.io/bo/apiNG-plugin-dailymotion)

**_apiNG-plugin-dailymotion_** is a [Dailymotion Data API](https://developer.dailymotion.com/api) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`, `video`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* Used promise library: [angular-dailymotion-api-factory](https://github.com/JohnnyTheTank/angular-dailymotion-api-factory) _(included in distribution files)_

# Documentation
1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [USAGE](#2-usage)
    1. Models
    2. Requests

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-dailymotion --save`
* `npm install aping-plugin-dailymotion --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-dailymotion)
* download [apiNG-plugin-dailymotion.zip](https://github.com/JohnnyTheTank/apiNG-plugin-dailymotion/zipball/master)

### II. Include file
Include `aping-plugin-dailymotion.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-dailymotion/dist/aping-plugin-dailymotion.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-dailymotion/dist/aping-plugin-dailymotion.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/aping.plugin-dailymotion/latest/aping-plugin-dailymotion.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-dailymotion.min.js"></script>
```

### III. Add dependency
Add the module `jtt_aping_dailymotion` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_dailymotion']);
```

### IV. Add the plugin
Add the plugin's directive `aping-dailymotion="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-dailymotion="[{'search':'eminem'}]">
</aping>
```

## 2. USAGE

### I. Models
Supported apiNG models

|  model   | content | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|---------|
| `social` | **videos** | full    | `100`   | `10`   |
| `video`  | **videos** | full    | `100`   | `10`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Requests by User
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`userId`** | `brtvofficial` |  | User ID  | no |
| **`search`**  | `eminem` |   | Limit the result set to this full text search |  yes  |
| **`tags`**  | `hiphop,rap` |   | Limit the result set to this full text search of video tags |  yes  |
| **`channelId`**  | `music` |   | Limit the result set to this channel ([Browse channels](http://www.dailymotion.com/browse)) |  yes  |
| **`items`**  | `25` | `10` | Items per request (`0`-`100`) |  yes  |
| **`protocol`**  | `https` |  | Use `https` or `http` to force the protocol. Leave it blank to for dynamic choice. Works only for model `video` |  yes  |


Sample requests:
* `[{'userId':'lolaflips'}, {'userId':'thepetcollective'}]`
* `[{'userId':'FailArmy', 'items':30, 'search':'2015'}]`

#### Requests by Channel
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`channelId`**  | `music` |   | Limit the result set to this channel ([Browse channels](http://www.dailymotion.com/browse)) |  no  |
| **`search`**  | `eminem` |   | Limit the result set to this full text search |  yes  |
| **`tags`**  | `hiphop,rap` |   | Limit the result set to this full text search of video tags |  yes  |
| **`items`**  | `25` | `10` | Items per request (`0`-`100`) |  yes  |
| **`protocol`**  | `https` |  | Use `https` or `http` to force the protocol. Leave it blank to for dynamic choice. Works only for model `video` |  yes  |

Sample requests:
* `[{'channelId':'music'}]`

#### Requests by Playlist
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`playlistId`**  | `x439f7_brtvofficial_br-highlights-september` |   | Limit the result set to this playlist |  no  |
| **`search`**  | `eminem` |   | Limit the result set to this full text search |  yes  |
| **`tags`**  | `hiphop,rap` |   | Limit the result set to this full text search of video tags |  yes  |
| **`items`**  | `25` | `10` | Items per request (`0`-`100`) |  yes  |
| **`protocol`**  | `https` |  | Use `https` or `http` to force the protocol. Leave it blank to for dynamic choice. Works only for model `video` |  yes  |

Sample requests:
* `[{'channelId':'x439f7_brtvofficial_br-highlights-september'}]`

#### Requests by Search
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`search`**  | `eminem` |   | Limit the result set to this full text search |  no  |
| **`tags`**  | `hiphop,rap` |   | Limit the result set to this full text search of video tags |  yes  |
| **`genre`**  | `comedy` |   | 	Limit the result set to this genre of videos |  yes  |
| **`country`**  | `us` |   | Limit the result set to this country (declarative) |  yes  |
| **`language`**  | `en` |   | Limit the result set to this language |  yes  |
| **`items`**  | `25` | `10` | Items per request (`0`-`100`) |  yes  |
| **`protocol`**  | `https` |  | Use `https` or `http` to force the protocol. Leave it blank to for dynamic choice. Works only for model `video` |  yes  |

Sample requests:
* `[{'search':'adele'}]`
* `[{'search':'Louis C K', 'language':'en', 'items':5}]`

#### Requests by Tags
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`tags`**  | `hiphop,rap` |   | Limit the result set to this full text search of video tags |  no  |
| **`search`**  | `eminem` |   | Limit the result set to this full text search |  yes  |
| **`genre`**  | `comedy` |   | 	Limit the result set to this genre of videos |  yes  |
| **`country`**  | `us` |   | Limit the result set to this country (declarative) |  yes  |
| **`language`**  | `en` |   | Limit the result set to this language |  yes  |
| **`items`**  | `25` | `10` | Items per request (`0`-`100`) |  yes  |
| **`protocol`**  | `https` |  | Use `https` or `http` to force the protocol. Leave it blank to for dynamic choice. Works only for model `video` |  yes  |

Sample requests:
* `[{'tags':'soccer'}]`
* `[{'tags':'fcbayern,müller', 'language':'de', 'items':5}]`

# Licence
MIT
