let Waterfall = (function () {
    let column = Array.from(document.querySelectorAll(".column"))
    // console.log(column);
    let data = null
    let getData = function getData() {
        let xhr = new XMLHttpRequest()
        xhr.open("get", "./json/data.json", false)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText)
                // console.log(data);
            }
        }
        xhr.send()
    }

    let bindHtml = function bindHtml() {
        data = data.map(item => {
            let w = item.width
            let h = item.height
            h = h / (w / 230);
            item.width = 230;
            item.height = h
            return item
        })
        for (let i = 0; i < data.length; i += 3) {
            let sl = data.slice(i, i + 3)
            sl.sort((a, b) => {
                return a.height - b.height
            })

            column.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight
            })
            sl.forEach((item, index) => {
                let card = document.createElement("div")
                card.className = "card"
                card.innerHTML = ` <a href="${item.link}">
                <div class="Imgbox" style="height:${item.height}px">
                    <img src="" alt="" data-image="${item.pic}">
                </div>
            </a>
            <p>${item.title}</p>`
                column[index].appendChild(card)
            })
        }
    }

    let LoadImg = function () {
        let Imgbox = document.querySelectorAll(".Imgbox");
        //   console.log(Imgbox);
        [].forEach.call(Imgbox, item => {
            let isLoad = item.getAttribute('isLoad');
            if (isLoad === "true") return;
            let b = document.documentElement.clientHeight + document.documentElement.scrollTop;
            let a = utils.offset(item).top + item.offsetHeight / 2;
            if (b >= a) {
                displayImg(item)
            }
        })

    }

    let displayImg = function displayImg(Imgbox) {
        let img = Imgbox.querySelector('img')
        let dataImage = img.getAttribute("data-image")
        // console.log(dataImage);
        let tempImg = new Image
        tempImg.src = dataImage
        tempImg.onload = () => {
            img.src = dataImage
            utils.css(img, "opacity", 1)
        }
        img.removeAttribute('data-image');
        tempImg = null
        Imgbox.setAttribute("isload", "true")
    }

    let Stop;
    let stopImg = function () {
        let html = document.documentElement
        if (html.clientHeight + html.scrollTop + html.clientHeight / 2 >= html.offsetHeight) {
            if (Stop) return
            Stop = true
            getData()
            bindHtml()
            LoadImg()
            Stop = false
        }
    }
    return {
        init() {
            getData()
            bindHtml()
            LoadImg()
            window.onscroll = function () {
                LoadImg()
                stopImg()
            }
        }
    }
})()
Waterfall.init()