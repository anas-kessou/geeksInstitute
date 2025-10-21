class video{
    constructor(title,uploader,time){
        this.title=title;
        this.uploader=uploader;
        this.time=time;
    }

    watch(){
        console.loge(`${this.uploader} watched all ${this.time} of ${this.title}!`);
    }
}


const v1 = new video("The JavaScript Tutorial", "Alice", 300)
v1.watch();

const v2 = new video("Understanding OOP", "Bob", 450);

const tabData = [
    { title: "Intro to HTML", uploader: "Charlie", time: 200 },
    { title: "CSS Basics", uploader: "Dana", time: 180 },
    { title: "JavaScript Loops", uploader: "Eve", time: 240 },
    { title: "React Hooks", uploader: "Frank", time: 600 },
    { title: "Async Await", uploader: "Grace", time: 350 }
]

const Videos=[]
tabData.forEach(data => {
    const v = new video(data.title,data.uploader,data.time);
    Videos.push(video);
    v.watch();
})