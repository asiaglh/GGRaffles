$(document).ready(function() {
    const swiper = new Swiper('.dontMiss__products', {


        breakpoints: {
            500:{
                slidesPerView: 'auto',
                spaceBetween: 20,
                slidesPerGroup: 1,
            },
            200: {
                slidesPerView: 'auto',
                spaceBetween: 10,
                slidesPerGroup: 1,
            }
        }

    });

    $(function () {
        $(".accordion__title").on("click", function (e) {

            e.preventDefault();
            var $this = $(this);

            if (!$this.hasClass("accordion-active")) {
                $(".accordion__content").slideUp(400);
                $(".accordion__title").removeClass("accordion-active");
                $('.accordion__arrow').removeClass('accordion__rotate');
            }

            $this.toggleClass("accordion-active");
            $this.next().slideToggle();
            $('.accordion__arrow', this).toggleClass('accordion__rotate');
        });
    });

    function showed(parent, state, item) {

        const parentElem = $(`${parent}[data-show=${state}]`)

        let positionParent = $(parentElem).offset().top;


        const button = $(parentElem).find(".showAll");
        const hideButton = $(parentElem).find(".hide");
         $(hideButton).css("display", "none");

        if((window.innerWidth < 769)){
            $(parentElem).find(".hidden:lt(3)").removeClass('hidden')
        }
        else if((window.innerWidth > 769)){
            $(parentElem).find(".hidden:lt(6)").removeClass('hidden')
        }



        $(button).on('click' , () =>{
            let position = $(window).scrollTop();
                $(parentElem).find(item).removeClass("hidden");
                $(button).css("display", "none");
                $(hideButton).css("display", "flex");
                window.scrollTo(0, position);
        })

        $(hideButton).on('click' , () =>{

                $(parentElem).find(item).addClass("hidden");
                $(button).css("display", "flex");
                $(hideButton).css("display", "none");
            if((window.innerWidth < 769)){
                $(parentElem).find(".hidden:lt(3)").removeClass('hidden')
            }
            else if((window.innerWidth > 769)){
                $(parentElem).find(".hidden:lt(6)").removeClass('hidden')
            }
                $('html, body').animate({
                    scrollTop:  positionParent-350
                }, 300)
        })
    }

    if($(".showAll").length && $(".block__type1.show").length) {
        showed(".block__type1", 1, ".product__card");
        showed(".block__type1", 2, ".product__card");
        showed(".block__type1", 3, ".product__card");
        showed(".block__type1", 4, ".product__card");
        showed(".block__type1", 5, ".product__card");
    }
    else if($(".showAll").length && $(".block-news__body").length){
        showed(".block-news__body", 1, ".newsCard-item");
    }
    else if($(".news-comments").length && $(".showAll").length){
        showed(".news-comments", 1, ".news-comment");
    }
    else{
        if(window.innerWidth < 769){
            $(".block__type1").find(".hidden:lt(3)").removeClass('hidden')
        }
        else{
            $(".block__type1").find(".hidden:lt(6)").removeClass('hidden')
        }
    }

    function ProgressBar(parent){
        const card=$(parent);
        for(let i=0; i<card.length; i++) {
            let total=$(card[i]).find(".progressBar").attr('data-total');
            let progress=$(card[i]).find(".progressBar").attr('data-progress');

            let left = total-progress;
            let width=(progress/(total/100));

            $(card[i]).find(".data-left").text(left);
            $(card[i]).find(".progressBar-value").width(width + '%');
        }

    }

    if($(".product__card").length){ProgressBar(".product__card")}
    if($(".product__body").length){ProgressBar(".product__body")}
    if($(".shopping-item").length){ProgressBar(".shopping-item")}

    function ProductsNav(btn, parent){
        $(btn).each(function (){
            $(this).on('click', () => {
                let tab=this.getAttribute("data-tab")
                $(".productsNav-item").removeClass("active")
                $(btn).removeClass("active");
                $(this).addClass("active");
                if (tab === "allSkins") {
                    $(".block__type1").find(".product__card").removeClass("hidden");
                } else if (tab !== "allSkins") {
                    $(parent).find(".product__card").addClass("hidden");
                    $(parent).find(".product__card").each(function () {
                        if (this.getAttribute('data-tab') === tab) {
                            this.classList.remove("hidden")
                        }
                    })
                }
            })
        })
    }

    if($(".productsNav-item").length) {
        ProductsNav(".productsNav-item", ".block__type1")
    }

    function Counts(parentElem){
       const btnMinus=$(parentElem).find(".minus");
       const btnPlus=$(parentElem).find(".plus");
       const count= $(parentElem).find(`[data-counts=${"items"}]`);
       const totalPrice=$(parentElem).find(`[data-counts=${"totalPrice"}]`);
       const price=$(parentElem).find(`[data-counts=${"price"}]`).text();
       let items=count.text();

       btnMinus.on('click' , () =>{
           if(items!==1){
               items--;
               count.text(items);
               totalPrice.text(price*items);
           }
       })
        btnPlus.on('click' , () =>{
            items++
            count.text(items);
            totalPrice.text(price*items);
        })

    }

   if($(".product__body").length){
       Counts(".product__body")
   };

   function accountNav(){
       const btn=$(".account__nav-item")
       $(btn).each(function (){
           $(this).on('click', () => {
               let tab=this.getAttribute("data-tab");
               $(btn).removeClass("active");
               $(this).addClass("active");

                   $(".account__content").find(".account__content-item").addClass("hidden");
                   $(".account__content").find(".account__content-item").each(function () {
                       if (this.getAttribute('data-tab') === tab) {
                           this.classList.remove("hidden")
                       }
                   })
           })
       })
   }

  accountNav()

        $(".header__burger").on('click', () => {
               $(".header").toggleClass("active");
               $("body").toggleClass("active");
       })


       $(".payment-btn").each(function (){
           $(this).on('click', () => {
               let tab=this.getAttribute("data-status");
               this.classList.toggle("active");
               $(".payment-status").each(function () {
                   if (this.getAttribute('data-status') === tab) {
                       this.classList.toggle("active")
                   }
               })
           })
       })

    $(".checkBox").each(function (){
        $(this).on('click', () => {
            let parent=this.parentElement;
            $(".checkBox-item").each(function (){
                this.classList.remove("checked");
            })
            parent.classList.toggle("checked");
        })
    })

        if($(".shopping-item").length) {
            $(".shopping-item").each(function () {
                const count = $(this).find(`[data-counts=${"items"}]`);
                const totalPrice = $(this).find(`[data-counts=${"totalPrice"}]`);
                const price = $(this).find(`[data-counts=${"price"}]`).text();
                let items = count.text();

                $(this).find(".minus").on('click', () => {
                    if (items !== 1) {
                        items--;
                        count.text(items);
                        totalPrice.text(price * items);
                    }
                })
                $(this).find(".plus").on('click', () => {
                    items++
                    count.text(items);
                    totalPrice.text(price * items);
                })
            })
        }

})
