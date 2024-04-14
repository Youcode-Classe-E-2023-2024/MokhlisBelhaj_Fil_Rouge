<div>
    <div class="containerr">
        <div class="carouselll">
            <div class="carouselll__face"><span></span></div>
            <div class="carouselll__face"><span></span></div>
            <div class="carouselll__face"><span></span></div>
            <div class="carouselll__face"><span></span></div>
            <div class="carouselll__face"><span></span></div>
            <div class="carouselll__face"><span></span></div>
            <div class="carouselll__face"><span></span></div>
           
        </div>
    </div>
    
    <div class="py-32 text-center">
      <h2 class="hero__heading">The world’s destination for artists</h2>
    </div>
    <style>
        .hero__heading{
            -webkit-font-smoothing: antialiased;
            --zi-header: 9996;
            --zi-header-behind: calc(var(--zi-header) - 1);
            --zi-shot-overlay: calc(var(--zi-header) + 1);
            --zi-attachment-overlay: calc(var(--zi-shot-overlay) + 1);
            --zi-default-overlay: calc(var(--zi-shot-overlay) + 3);
            --zi-hovercard: calc(var(--zi-shot-overlay) + 1);
            --zi-tipsy: calc(var(--zi-default-overlay) + 1);
            --zi-dialog: calc(var(--zi-default-overlay) + 5);
            --zi-filter: 1000;
            --zi-dropdown: 1000;
            --zi-autocomplete: calc(var(--zi-shot-overlay) + 1);
            --zi-places-menu: calc(var(--zi-dropdown) - 1);
            --zi-sticky-job-header: calc(var(--zi-hovercard) + 1);
            --zi-jobs-bg-effect: 10;
            --zi-playbook-overlay: var(--zi-shot-overlay);
            --zi-playbook-notice: calc(var(--zi-playbook-overlay) - 1);
            --zi-playbook-customize: calc(var(--zi-playbook-notice) + 1);
            --zi-playbook-head: 2;
            --zi-playbook-edit-links: calc(var(--zi-playbook-head) + 1);
            --btn-bg-color: #0d0c22;
            --btn-bg-color-hover: #565564;
            --btn-text-color: #fff;
            --btn-text-color-hover: #fff;
            --btn-border-color: var(--btn-bg-color);
            --btn-border-color-hover: var(--btn-bg-color-hover);
            --btn-height: 40px;
            --btn-padding: 20px;
            --btn-font-size: 13px;
            --btn-icon-size: 16px;
            --announcements-gutter: 0;
            --nav-v2-bg-color-mobile: #fff;
            --nav-v2-height: 100px;
            --nav-v2-font-size: 14px;
            --nav-v2-font-weight: 600;
            --nav-v2-gutter: 40px;
            --input-padding: 12px;
            --banner-gutter: 72px;
            --tagify-dd-color-primary: 234, 100, 217;
            font-feature-settings: 'ss01';
            color: #0d0c22;
            --nav-v2-bg-color: #f8f7f4;
            --nav-v2-search-bg-color: #fff;
            text-align: center;
            padding: 0;
            border: 0;
            background: transparent;
            vertical-align: baseline;
            margin: 40px auto 24px;
            font-family: "Source Serif 4", Georgia, serif;
            font-weight: 400;
            letter-spacing: -0.5px;
            max-width: 750px;
            font-size: 72px;
            line-height: 76px;  
        }
        .containerr {
            position: relative;
            width: 320px;
            margin: 100px auto 0 auto;
            perspective: 1000px;
        }

        .carouselll {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            animation: rotate360 60s infinite forwards linear;
        }

        .carouselll__face {
            position: absolute;
            width: 300px;
            height: 187px;
            top: 20px;
            left: 10px;
            right: 10px;
            background-size: cover;
            display: flex;
        }




        .carouselll__face:nth-child(1) {
            background-image: url("https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(0deg) translateZ(430px);
        }

        .carouselll__face:nth-child(2) {
            background-image: url("https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(40deg) translateZ(430px);
        }

        .carouselll__face:nth-child(3) {
            background-image: url("https://images.unsplash.com/photo-1559813114-cda845612ae7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(80deg) translateZ(430px);
        }

        .carouselll__face:nth-child(4) {
            background-image: url("https://images.unsplash.com/photo-1583787035686-91b82ad5d811?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(120deg) translateZ(430px);
        }

        .carouselll__face:nth-child(5) {
            background-image: url("https://images.unsplash.com/photo-1532543307581-8b01a7ff954f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(160deg) translateZ(430px);
        }

        .carouselll__face:nth-child(6) {
            background-image: url("https://plus.unsplash.com/premium_photo-1682125771198-f7cbed7cb868?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(200deg) translateZ(430px);
        }

        .carouselll__face:nth-child(7) {
            background-image: url("https://plus.unsplash.com/premium_photo-1676391702953-f6ef6316eb0a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            transform: rotateY(240deg) translateZ(430px);
        }



        @keyframes rotate360 {
            from {
                transform: rotateY(-360deg);
            }

            to {
                transform: rotateY(-0deg);
            }
        }


        .max-h-80 {
            max-height: 200px;
        }


        @media (max-width: 375px) {
            .categorie {
                display: block;
            }
        }

        @media (min-width: 1440px) {
            .categorie {
                position: fixed;
            }
        }
        @media only screen and (max-width: 768px) {
  .containerr .carouselll__face {
display:none;
}
}
    </style>
    </div>