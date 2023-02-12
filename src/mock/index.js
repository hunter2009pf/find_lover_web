const Mock = require("mockjs");

Mock.mock(/friend\/friendList/, 'post', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return friendList
})

Mock.mock(/friend\/chatMsg/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let params = JSON.parse(config.body)
    if (params.frinedId == "1002")
        return chatMsg1002
    if (params.frinedId == "1003")
        return chatMsg1003
    if (params.frinedId == "1004")
        return chatMsg1004
})


let friendList = Mock.mock(
    [
        {
            img: "",
            name: "大毛",
            detail: "我是大毛",
            lastMsg: "to do",
            id: "1002",
            headImg: require("@/assets/img/head_portrait1.jpg"),

        },
        {
            img: "",
            name: "小毛",
            detail: "我是小毛",
            lastMsg: "dada dw ertgthy j uy",
            id: "1003",
            headImg: require("@/assets/img/head_portrait2.jpg"),

        },
        {
            img: "",
            name: "小王",
            detail: "我是小王",
            lastMsg: "大萨达萨达所大大萨达",
            id: "1004",
            headImg: require("@/assets/img/head_portrait3.jpg"),

        },
    ]
)

let chatMsg1002 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " Same here! Been working project for the past 5 hours despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: " Same here! Been working project for the past 5 hours despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "Same here! Been working project for the past 5 hours despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait1.jpg"),
            name: "大毛",
            time: "09：12 AM",
            msg: "to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)
let chatMsg1003 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " 的武器的物权法润滑油它具有就该回家该方法回复观后感防护服哈和规范化发同意头发o",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: " 萨达萨达哇大所多谁打我的是否如果突然核桃油还要加㔿fhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "盒饭光和热挺好的返回给都发给顿肉肉人工费大概人刮大风个的个",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "frfrgrgtreg gt g fdg dfg drrg f d",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "qwewqewrr hy jy ju juyj ",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: "09：12 AM",
            msg: "dada dw ertgthy j uy",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)
let chatMsg1004 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: " sadasdawdas sadsad sad sad as despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: " 21312大萨达萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: "09：12 AM",
            msg: "111212",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: "09：12 AM",
            msg: "大萨达萨达所大大萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)