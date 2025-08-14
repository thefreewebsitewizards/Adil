// Sample product data
const products = {
    sneakers: [
        // Nike Products (4)
        {
            id: 1,
            name: "Nike Air Max 1000 'Red'",
            brand: "nike",
            price: 399,
            originalPrice: 450,
            image: "images/nike-air-max-1000-red.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 2,
            name: "Nike Air Jordan 4 Retro GS 'Pizza'",
            brand: "nike",
            price: 199,
            originalPrice: 220,
            image: "images/nike-jordan-4-pizza.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 3,
            name: "Nike Dunk Low 'Black White'",
            brand: "nike",
            price: 84,
            originalPrice: 100,
            image: "images/nike-dunk-low-black-white.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 4,
            name: "Nike Air Force 1 '07 'Triple White'",
            brand: "nike",
            price: 110,
            image: "images/nike-air-force-1-white.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        // Jordan Products (4)
        {
            id: 5,
            name: "Air Jordan 4 Retro 'Taupe Haze'",
            brand: "jordan",
            price: 359,
            originalPrice: 400,
            image: "images/jordan-4-taupe-haze.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 6,
            name: "Nike Air Jordan 10 Retro 'Steel' 2025",
            brand: "jordan",
            price: 288,
            originalPrice: 320,
            image: "images/nike-jordan-10-steel.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 7,
            name: "Undefeated X Air Jordan 4 Retro 2025",
            brand: "jordan",
            price: 62399,
            image: "images/jordan-4-undefeated-olive.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        {
            id: 8,
            name: "Air Jordan 1 Retro High OG Craft 'Celadon'",
            brand: "jordan",
            price: 159,
            originalPrice: 239,
            image: "images/jordan-1-celadon-craft.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        // Yeezy Products (2)
        {
            id: 9,
            name: "Yeezy Boost 350 V2 'Zebra'",
            brand: "yeezy",
            price: 299,
            originalPrice: 350,
            image: "images/yeezy-350-zebra.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 10,
            name: "Yeezy Boost 700 'Wave Runner'",
            brand: "yeezy",
            price: 399,
            image: "images/yeezy-700-wave-runner.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        // Onitsuka Tiger Products (5)
        {
            id: 11,
            name: "Onitsuka Tiger Mexico 66 'Kill Bill'",
            brand: "onitsuka",
            price: 22999,
            image: "images/onitsuka-mexico-66-yellow.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        {
            id: 12,
            name: "Onitsuka Tiger Mexico 66 'Birch Peacoat'",
            brand: "onitsuka",
            price: 19999,
            image: "images/onitsuka-mexico-66-birch.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        {
            id: 13,
            name: "Onitsuka Tiger Mexico 66 'Silver Off White'",
            brand: "onitsuka",
            price: 22999,
            image: "images/onitsuka-mexico-66-silver.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        {
            id: 14,
            name: "Onitsuka Tiger Mexico 66 'White Blue Red'",
            brand: "onitsuka",
            price: 22999,
            image: "images/onitsuka-mexico-66-white-blue.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        {
            id: 15,
            name: "Onitsuka Tiger Mexico 66 'Black White'",
            brand: "onitsuka",
            price: 22999,
            image: "images/onitsuka-mexico-66-black.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        // Adidas Products (3)
        {
            id: 16,
            name: "Adidas Ultraboost 22 'Core Black'",
            brand: "adidas",
            price: 180,
            originalPrice: 200,
            image: "images/adidas-ultraboost-22-black.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        {
            id: 17,
            name: "Adidas Harden Vol. 9 'Stormtrooper'",
            brand: "adidas",
            price: 130,
            originalPrice: 145,
            image: "images/adidas-harden-vol9-stormtrooper.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "sneakers"
        },
        // New Balance Products (2)
        {
            id: 18,
            name: "New Balance 550 'White Green'",
            brand: "new-balance",
            price: 120,
            image: "images/new-balance-550-white-green.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        {
            id: 19,
            name: "New Balance 2002R 'Protection Pack - Rain Cloud'",
            brand: "new-balance",
            price: 150,
            image: "images/new-balance-2002r-rain-cloud.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        },
        // Vans Products (1)
        {
            id: 20,
            name: "Vans Old Skool 'Black White'",
            brand: "vans",
            price: 65,
            image: "images/vans-old-skool-black-white.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "sneakers"
        }
    ],
    streetwear: [
        {
            id: 26,
            name: "Supreme Cross Box Logo 'White'",
            brand: "supreme",
            price: 7999,
            originalPrice: 11999,
            image: "images/supreme-cross-box-logo-white.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 27,
            name: "Supreme Backwards Black",
            brand: "supreme",
            price: 9999,
            image: "images/supreme-backwards-black.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 31,
            name: "Supreme Cross Box Logo 'Black'",
            brand: "supreme",
            price: 7999,
            originalPrice: 11999,
            image: "images/supreme-cross-box-logo-black.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 32,
            name: "Supreme Still Talking Tee White",
            brand: "supreme",
            price: 9999,
            image: "images/supreme-still-talking-tee-white.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 33,
            name: "Supreme Still Talking Tee Black",
            brand: "supreme",
            price: 9999,
            image: "images/supreme-still-talking-tee-black.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 34,
            name: "Off-White Blue Marker White Blue Oversized Tee",
            brand: "off-white",
            price: 18499,
            originalPrice: 22999,
            image: "images/off-white-blue-marker-white-blue-oversized-tee.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 35,
            name: "Off-White Diag ARR Carav Mercy Skat Black Tee",
            brand: "off-white",
            price: 15999,
            originalPrice: 19999,
            image: "images/off-white-diag-arr-carav-mercy-skat-black-tee.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: false,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 36,
            name: "Off-White Caravaggio Arrow Black Multicolour Slim Fit Tee",
            brand: "off-white",
            price: 17999,
            image: "images/off-white-caravaggio-arrow-black-multicolour-slim-fit-tee.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: false,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 37,
            name: "Off-White Black Marker Oversized Tee",
            brand: "off-white",
            price: 19999,
            originalPrice: 23999,
            image: "images/off-white-black-marker-oversized-tee.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 38,
            name: "Off-White Weed Arrows Black Oversized Tee",
            brand: "off-white",
            price: 18999,
            originalPrice: 21999,
            image: "images/off-white-weed-arrows-black-oversized-tee.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 39,
            name: "Stussy Raglan Thermal LS Crew Bone",
            brand: "stussy",
            price: 16499,
            originalPrice: 19999,
            image: "images/stussy-raglan-thermal-ls-crew-bone.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 40,
            name: "Stussy Beat Crazy Tee 'RED'",
            brand: "stussy",
            price: 6999,
            image: "images/stussy-beat-crazy-tee-red.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 41,
            name: "Stussy 8 Ball Pigment Dyed Tee 'Natural'",
            brand: "stussy",
            price: 7499,
            originalPrice: 8499,
            image: "images/stussy-8-ball-pigment-dyed-tee-natural.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 42,
            name: "Stussy Beat Crazy Tee 'Fog'",
            brand: "stussy",
            price: 6999,
            image: "images/stussy-beat-crazy-tee-fog.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: false,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 43,
            name: "Stussy Doberman Tee Fog",
            brand: "stussy",
            price: 6999,
            image: "images/stussy-doberman-tee-fog.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 44,
            name: "Palm Angels X VLone Black Purple Tee",
            brand: "vlone",
            price: 8499,
            originalPrice: 10499,
            image: "images/palm-angels-x-vlone-black-purple-tee.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 45,
            name: "Vlone X Never Broke Again Eyes Hoodie Black",
            brand: "vlone",
            price: 11999,
            image: "images/vlone-x-never-broke-again-eyes-hoodie-black.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: false,
            category: "streetwear"
        },
        {
            id: 46,
            name: "VLone X Juice WRLD Tee Black",
            brand: "vlone",
            price: 7999,
            image: "images/vlone-x-juice-wrld-tee-black.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: false,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 47,
            name: "VLone X Juice WRLD Tee White",
            brand: "vlone",
            price: 3999,
            originalPrice: 4999,
            image: "images/vlone-x-juice-wrld-tee-white.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        },
        {
            id: 48,
            name: "Vlone Snake Tshirt White",
            brand: "vlone",
            price: 7999,
            originalPrice: 8999,
            image: "images/vlone-snake-tshirt-white.jpg",
            sizes: ["S", "M", "L", "XL"],
            inStock: true,
            onSale: true,
            category: "streetwear"
        }
    ],
    accessories: [

        {
            id: 49,
            name: "Ray Ban Meta Smart Glasses - Wayfarer Matte Black Graphite Lenses",
            brand: "ray-ban",
            price: 31499,
            originalPrice: 38999,
            image: "images/ray-ban-meta-smart-wayfarer-matte-black.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: true,
            category: "accessories",
            subcategory: "shades"
        },
        {
            id: 50,
            name: "Ray Ban Meta Skyler 'Shiny Black' Lenses- Clear/Amethyst",
            brand: "ray-ban",
            price: 25999,
            image: "images/ray-ban-meta-skyler-shiny-black.jpg",
            sizes: ["One Size"],
            inStock: false,
            onSale: false,
            category: "accessories",
            subcategory: "shades"
        },
        {
            id: 51,
            name: "Ray-Ban Meta Low Bridge Fit Headliner 'Shiny Black Lenses G-15 Green'",
            brand: "ray-ban",
            price: 29999,
            image: "images/ray-ban-meta-low-bridge-headliner-shiny-black.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: false,
            category: "accessories",
            subcategory: "shades"
        },
        {
            id: 52,
            name: "Ray Ban Meta Smart Glasses - Wayfarer Shiny Black G-15 Green Lenses",
            brand: "ray-ban",
            price: 29999,
            originalPrice: 38999,
            image: "images/ray-ban-meta-smart-wayfarer-shiny-black-green.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: true,
            category: "accessories",
            subcategory: "shades"
        },
        {
            id: 53,
            name: "Ray Ban Meta Smart Glasses - Wayfarer Shiny Warm Stone Lenses- Clear/Watermelon Red Transitions",
            brand: "ray-ban",
            price: 35999,
            image: "images/ray-ban-meta-smart-wayfarer-warm-stone.jpg",
            sizes: ["One Size"],
            inStock: false,
            onSale: false,
            category: "accessories",
            subcategory: "shades"
        },
        {
            id: 54,
            name: "Casio G Shock 'Black'",
            brand: "casio",
            price: 8999,
            image: "images/casio-g-shock-black.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: false,
            category: "accessories",
            subcategory: "watches"
        },
        {
            id: 55,
            name: "Casio G Shock 'Red'",
            brand: "casio",
            price: 9499,
            image: "images/casio-g-shock-red.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: false,
            category: "accessories",
            subcategory: "watches"
        },
        {
            id: 56,
            name: "Casio Digital 'Silver'",
            brand: "casio",
            price: 3999,
            image: "images/casio-digital-silver.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: false,
            category: "accessories",
            subcategory: "watches"
        },
        {
            id: 57,
            name: "Whoop 5.0 Leatherluxe Tapered Black With Titanium Band (12 Month Peak Subscription Included)",
            brand: "whoop",
            price: 38999,
            image: "images/whoop-leatherluxe-tapered-black.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: false,
            category: "accessories",
            subcategory: "superknit-band"
        },
        {
            id: 58,
            name: "Whoop 5.0 Leatherluxe Straight Black/Cream With Titanium Band (12 Month Peak Subscription Included)",
            brand: "whoop",
            price: 39999,
            image: "images/whoop-leatherluxe-straight-black-cream.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: false,
            category: "accessories",
            subcategory: "superknit-band"
        },
        {
            id: 59,
            name: "Whoop 5.0 Superknit Dune Band (12 Month Peak Subscription Included)",
            brand: "whoop",
            price: 32999,
            originalPrice: 33999,
            image: "images/whoop-superknit-dune.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: true,
            category: "accessories",
            subcategory: "superknit-band"
        },
        {
            id: 60,
            name: "Whoop 5.0 Sportflex Propel Band (12 Month Peak Subscription Included)",
            brand: "whoop",
            price: 32999,
            originalPrice: 33999,
            image: "images/whoop-sportflex-propel.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: true,
            category: "accessories",
            subcategory: "superknit-band"
        },
        {
            id: 61,
            name: "Whoop 5.0 Superknit Glacier Band (12 Month Peak Subscription Included)",
            brand: "whoop",
            price: 31499,
            originalPrice: 32499,
            image: "images/whoop-superknit-glacier.jpg",
            sizes: ["One Size"],
            inStock: true,
            onSale: true,
            category: "accessories",
            subcategory: "superknit-band"
        }
    ],
    running: [
        {
            id: 62,
            name: "On Running Loewe X Cloudtilt 'Dark Sand'",
            brand: "on-cloud",
            price: 52999,
            image: "images/on-running-loewe-cloudtilt-dark-sand.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 63,
            name: "THE ROGER Clubhouse White | Evergreen On Running",
            brand: "on-cloud",
            price: 18199,
            image: "images/the-roger-clubhouse-white-evergreen.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 64,
            name: "On Running Cloudswift 4 AD Sand | Ivory",
            brand: "on-cloud",
            price: 20899,
            image: "images/on-running-cloudswift-4-ad-sand-ivory.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 65,
            name: "On Running Cloudnova X Pebble | Black",
            brand: "on-cloud",
            price: 20899,
            image: "images/on-running-cloudnova-x-pebble-black.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 66,
            name: "On Running Cloudhorizon Olive | Thorn",
            brand: "on-cloud",
            price: 21799,
            image: "images/on-running-cloudhorizon-olive-thorn.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 67,
            name: "Nike Zoom Fly 6 'Black Light Smoke Grey'",
            brand: "nike",
            price: 13299,
            originalPrice: 21999,
            image: "images/nike-zoom-fly-6-black-light-smoke-grey.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "running"
        },
        {
            id: 68,
            name: "Nike Zoom Fly 5 'White Black Old Royal'",
            brand: "nike",
            price: 14999,
            image: "images/nike-zoom-fly-5-white-black-old-royal.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 69,
            name: "Nike Air Zoom Alphafly NEXT% 2 'Prototype'",
            brand: "nike",
            price: 31699,
            image: "images/nike-air-zoom-alphafly-next-2-prototype.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 70,
            name: "Nike Air Zoom Pegasus 41 'White Dusty Cactus'",
            brand: "nike",
            price: 15899,
            image: "images/nike-air-zoom-pegasus-41-white-dusty-cactus.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 71,
            name: "Nike ZoomX Invincible 3 'Cool Grey Black'",
            brand: "nike",
            price: 16899,
            image: "images/nike-zoomx-invincible-3-cool-grey-black.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 72,
            name: "Asics Gel Cumulus 26 White/Cool Grey",
            brand: "asics",
            price: 18999,
            image: "images/asics-gel-cumulus-26-white-cool-grey.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 73,
            name: "Asics Gel Cumulus 26 Moonrock/Dark Mint",
            brand: "asics",
            price: 18999,
            image: "images/asics-gel-cumulus-26-moonrock-dark-mint.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 74,
            name: "Asics Kayano 30 French Blue/Neon Lime",
            brand: "asics",
            price: 15499,
            image: "images/asics-kayano-30-french-blue-neon-lime.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 75,
            name: "Asics Kayano 30 Oatmeal/Black",
            brand: "asics",
            price: 15499,
            image: "images/asics-kayano-30-oatmeal-black.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 76,
            name: "Asics Gel Nimbus 10.1 Ocean Haze/Pure Silver",
            brand: "asics",
            price: 20999,
            image: "images/asics-gel-nimbus-10-1-ocean-haze-pure-silver.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 77,
            name: "Adidas Adizero Evo SL 'White Black'",
            brand: "adidas",
            price: 14999,
            image: "images/adidas-adizero-evo-sl-white-black.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 78,
            name: "Yeezy Boost 350 V2 'Cloud White Reflective'",
            brand: "yeezy",
            price: 30399,
            originalPrice: 79999,
            image: "images/yeezy-boost-350-v2-cloud-white-reflective.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "running"
        },
        {
            id: 79,
            name: "Yeezy 700 V3 Kyanite",
            brand: "yeezy",
            price: 24999,
            image: "images/yeezy-700-v3-kyanite.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: false,
            category: "running"
        },
        {
            id: 80,
            name: "Yeezy 450 'Stone Flax'",
            brand: "yeezy",
            price: 12799,
            originalPrice: 29999,
            image: "images/yeezy-450-stone-flax.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "running"
        },
        {
            id: 81,
            name: "Yeezy Boost 350 V2 'Hyperspace' 2023",
            brand: "yeezy",
            price: 20499,
            originalPrice: 39999,
            image: "images/yeezy-boost-350-v2-hyperspace-2023.jpg",
            sizes: [7, 8, 9, 10, 11, 12],
            inStock: true,
            onSale: true,
            category: "running"
        }
    ]
};

// Get current page category
function getCurrentCategory() {
    const path = window.location.pathname;
    if (path.includes('sneakers')) return 'sneakers';
    if (path.includes('streetwear')) return 'streetwear';
    if (path.includes('accessories')) return 'accessories';
    if (path.includes('running')) return 'running';
    return 'sneakers'; // default
}

// Filter products based on current filters
function filterProducts() {
    const category = getCurrentCategory();
    let filteredProducts = [...products.sneakers]; // Start with all sneakers for now
    
    // Filter by category
    if (category === 'running') {
        filteredProducts = products.running || [];
    } else if (category === 'streetwear') {
        filteredProducts = products.streetwear || [];
    } else if (category === 'accessories') {
        filteredProducts = products.accessories || [];
    } else {
        filteredProducts = products.sneakers.filter(p => p.category === 'sneakers');
    }
    
    // Apply subcategory filters (for accessories like shades)
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.subcategory));
    }
    
    // Apply brand filters
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked')).map(cb => cb.value);
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand));
    }
    
    // Apply size filters
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter.selected')).map(btn => {
        const size = btn.dataset.size;
        return isNaN(size) ? size : parseInt(size);
    });
    if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            p.sizes.some(size => selectedSizes.includes(size))
        );
    }
    
    // Apply availability filters
    const inStockOnly = document.getElementById('in-stock')?.checked;
    const onSaleOnly = document.getElementById('on-sale')?.checked;
    
    if (inStockOnly) {
        filteredProducts = filteredProducts.filter(p => p.inStock);
    }
    
    if (onSaleOnly) {
        filteredProducts = filteredProducts.filter(p => p.onSale);
    }
    
    // Apply price filter
    const maxPrice = parseInt(document.getElementById('price-slider')?.value || 70000);
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    
    // Apply search filter
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    return filteredProducts;
}

// Create product card HTML
function createProductCard(product) {
    const saleTag = product.onSale ? `<div class="absolute top-2 right-2 sale-tag text-xs font-bold px-2 py-1 rounded">SALE</div>` : '';
    const stockStatus = product.inStock ? 
        `<span class="text-green-400 text-xs font-semibold">${Math.floor(Math.random() * 20) + 5}+ in stock</span>` :
        `<span class="text-red-400 text-xs font-semibold">Out of Stock</span>`;
    
    // Use peso symbol for accessories, dollar for others
    const currencySymbol = product.category === 'accessories' ? '₱' : '$';
    const formattedPrice = product.category === 'accessories' ? product.price.toLocaleString() : product.price;
    const formattedOriginalPrice = product.originalPrice && product.category === 'accessories' ? product.originalPrice.toLocaleString() : product.originalPrice;
    
    const priceHTML = product.originalPrice ? 
        `<div class="flex items-center space-x-2">
            <span class="font-bold">${currencySymbol}${formattedPrice}</span>
            <span class="text-gray-500 line-through text-sm">${currencySymbol}${formattedOriginalPrice}</span>
        </div>` :
        `<span class="font-bold">${currencySymbol}${formattedPrice}</span>`;
    
    return `
        <div class="product-card bg-gray-900 rounded-lg overflow-hidden transition duration-300 cursor-pointer" data-product-id="${product.id}">
            <div class="relative image-zoom">
                <img src="${product.image}" alt="${product.name}" class="transition duration-500">
                ${saleTag}
            </div>
            <div class="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="font-bold mb-1 text-sm md:text-base">${product.name}</h3>
                    <p class="text-gray-400 text-xs md:text-sm mb-2">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</p>
                </div>
                <div class="flex justify-between items-center mt-auto">
                    ${priceHTML}
                    ${stockStatus}
                </div>
                <div class="flex space-x-2 mt-3">
                    <button class="view-details-btn flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded text-sm transition duration-300" 
                            data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                        <i class="fas fa-eye mr-1"></i>View Details
                    </button>
                    <button class="add-to-cart-btn btn-primary text-black font-bold py-2 px-3 rounded flex-1 text-sm ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                             ${!product.inStock ? 'disabled' : ''}
                             data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                         <i class="fas fa-shopping-cart mr-1"></i>${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                     </button>
                </div>
            </div>
        </div>
    `;
}

// Render products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    
    if (!grid) return;
    
    const filteredProducts = filterProducts();
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-gray-400 py-8">No products found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Add click handlers for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.dataset.productId;
            // Navigate to product page (placeholder)
        });
    });
    
    // Dispatch custom event to notify that products have been rendered
    document.dispatchEvent(new CustomEvent('productsRendered'));
}

// Search suggestions
function showSearchSuggestions(query) {
    const suggestions = document.getElementById('search-suggestions');
    if (!suggestions || !query) {
        suggestions?.classList.add('hidden');
        return;
    }
    
    const allProducts = [...products.sneakers, ...(products.streetwear || []), ...(products.accessories || [])];
    const matches = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    if (matches.length === 0) {
        suggestions.classList.add('hidden');
        return;
    }
    
    suggestions.innerHTML = matches.map(product => 
        `<div class="suggestion-item" data-product="${product.name}">
            <div class="flex items-center space-x-3">
                <img src="${product.image}" alt="${product.name}" class="w-10 h-10 object-cover rounded">
                <div>
                    <div class="font-semibold text-sm">${product.name}</div>
                    <div class="text-xs text-gray-400">$${product.price}</div>
                </div>
            </div>
        </div>`
    ).join('');
    
    suggestions.classList.remove('hidden');
    
    // Add click handlers for suggestions
    suggestions.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('search-input').value = this.dataset.product;
            suggestions.classList.add('hidden');
            renderProducts();
        });
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    renderProducts();
    
    // Notify that products are rendered (for cart initialization)
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('productsRendered'));
    }, 100);
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value;
            showSearchSuggestions(query);
            renderProducts();
        });
        
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                document.getElementById('search-suggestions')?.classList.add('hidden');
            }, 200);
        });
    }
    
    // Filter event listeners
    document.querySelectorAll('.brand-filter').forEach(checkbox => {
        checkbox.addEventListener('change', renderProducts);
    });
    
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', renderProducts);
    });
    
    document.querySelectorAll('.size-filter').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('selected');
            renderProducts();
        });
    });
    
    document.getElementById('in-stock')?.addEventListener('change', renderProducts);
    document.getElementById('on-sale')?.addEventListener('change', renderProducts);
    
    // Price slider
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    if (priceSlider && priceValue) {
        priceSlider.addEventListener('input', function() {
            // Check if we're on accessories page to use peso symbol
            const isAccessoriesPage = window.location.pathname.includes('accessories.html');
            const currencySymbol = isAccessoriesPage ? '₱' : '$';
            const formattedValue = isAccessoriesPage ? parseInt(this.value).toLocaleString() : this.value;
            priceValue.textContent = `${currencySymbol}${formattedValue}`;
            renderProducts();
        });
    }
    
    
});



// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, filterProducts, renderProducts };
}