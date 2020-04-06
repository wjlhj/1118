let ShoppingMall = (function () {
    let navList = document.querySelectorAll(".navbar-nav .nav-item")
    let contentBox = document.querySelector(".contentBox")
    let data = null

    let getData = function get() {
        let xhr = new XMLHttpRequest()
        xhr.open("get", "./json/product.json", false)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText)
            }
        }
        xhr.send()
        console.log(data);

    }

    let render = function render() {
        let str = ``
        data.forEach(item => {
            str += ` <div class="card">
            <img src="${item.img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.price}</p>
                <p class="card-text">${item.time}</p>
                <p class="card-text">${item.hot}</p>
                <a href="#" class="btn btn-primary">立即购买</a>
            </div>
        </div>`
        })
        contentBox.innerHTML = str
    }

    let click = function click() {
        Array.from(navList).forEach(item => {
            item.flag = -1;
            item.onclick = function () {
                this.flag *= -1
                let pai = this.getAttribute("data-pai")
                console.log(pai);

                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, "")
                    b = String(b[pai]).replace(/-/g, "")
                    console.log(a);
                    
                    return (a - b) * this.flag
                })
                render()
            }
        })
    }
    return {
        init() {
            getData()
            render()
            click()
        }
    }
})()
ShoppingMall.init()