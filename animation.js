const h1 = document.querySelector('h1')
const imges = document.querySelectorAll('.portfolio_img')
const portfolioDiv = document.querySelector('.portfolioDiv')

function animateOpacity({draw,duration}){
    let start = performance.now()

    requestAnimationFrame(function animateOpacity(time){
        let progress = (time - start)/duration
        if(progress > 1) progress = 1

        draw(progress)

        if(progress < 1){
            requestAnimationFrame(animateOpacity)
        }
    })
}
function doAnimate(elem,durationn){
    animateOpacity({
        duration: durationn,
        draw(progress){
            elem.style.opacity = `${progress}`
        }
    })
}
setTimeout(() => {
    doAnimate(h1,3000)
}, 500);

const intervalOpacityImages = setInterval(() => {if(imges[0].getBoundingClientRect().y < 600){
    for(let i = 0;i < imges.length; i++){
        setTimeout(() => {doAnimate(imges[i],1000)},(i * 300))
        if(i === imges.length-1){clearInterval(intervalOpacityImages)}
    }
}},100)


