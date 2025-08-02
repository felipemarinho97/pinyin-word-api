# pinyin-word-api

**GET** /api/:hanzi  
Response: { url: "string" }

Get a link for a audio pronunciation of a given _hanzi_ from ChinesePod.com or HSK Academy.

**GET** /api/audio/:hanzi  
Response: Audio Blob

Get a audio pronunciation file of a given _hanzi_ from ChinesePod.com or HSK Academy.

**GET** /api/audio/pod/:hanzi  
Response: Audio Blob (From ChinesePod)

Get a audio pronunciation file of a given _hanzi_ from ChinesePod.com

**GET** /api/audio/hsk_academy/:hanzi  
Response: Audio Blob (From HSK Academy)

Get a audio pronunciation file of a given _hanzi_ from HSK Academy.

**GET** /api/audio/yabla/:hanzi  
Response: Audio Blob (From Yabla)

Get a audio pronunciation file of a given _hanzi_ from Yabla.com (not working).

**POST** /api/segment  
body: { text: string }  
Response: { segment: string[] }

Segment the given chinese phrase into words. ex: "我在青岛市崂山区工作。" returns [ '我', '在', '青岛市', '崂山区', '工作', '。' ]

**GET** /api/links/:hanzi  
Response: { "Wikitionary": string , "HSK Academy": string , "AllSetLearning": string }

Get links for more _in depth_ explanation from a given word. Supported websites: Wikitionary, AllSetLearning and HSK Academy.

## Author

@FelipeMarinho97
