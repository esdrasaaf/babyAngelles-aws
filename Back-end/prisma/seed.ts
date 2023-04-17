import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

async function main(){
    //Criando imagens promocionais
    const promotionImages = await prisma.promotionsImages.findMany({});
    if (promotionImages.length === 0 ) {
        await prisma.promotionsImages.createMany({
            data: [
                {
                    image: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cute-baby-products-promotion-banner-poster-background-image_180440.jpg"
                },
                {
                    image: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-double-eleven-mother-and-baby-big-promotion-banner-image_178357.jpg"
                },
                {
                    image: "https://img.panoramasistemas.com.br/platinumkids.img/imagem/12678/liquida-mobile.jpg"
                }
            ]
        })
    }

    //Criando categorias
    const categories = await prisma.categories.findMany({});
    if (categories.length === 0) {
        await prisma.categories.createMany({
            data: [
                {
                    name: "Macacão",
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/h7709d1f7c8f5416a9f68d628a62c844fe-57cae6115783677d3716632640893598-1024-1024.jpg"
                },
                {
                    name: "Tênis Bebê",
                    image: "https://cf.shopee.com.br/file/sg-11134201-22110-5j9wdpdy7ejvf8_tn"
                },
                {
                    name: "Camisa",
                    image: "https://cf.shopee.com.br/file/be217652a4311bc1e43ae837d7627dee"
                },
                {
                    name: "Calça",
                    image: "https://images.tcdn.com.br/img/img_prod/497578/calca_bebe_comfort_jeans_reta_708_1_7979f0afc760c5282efdf281fc9c5aff.jpg"
                },
            ]
        })
    }

    //Criando marcas
    const brands = await prisma.brands.findMany({});
    if (brands.length === 0) {
        await prisma.brands.createMany({
            data: [
                {
                    name: "Carter's",
                },
                {
                    name: "All-Star",
                },
                {
                    name: "Lilica Ripilica",
                },
                {
                    name: "Tigor T. Tigre",
                },
            ]
        })
    }

    //Criando cores
    const colors = await prisma.colors.findMany({});
    if (colors.length === 0) {
        await prisma.colors.createMany({
            data: [
                {
                    name: "Preto",
                    hexCode: "#000000"
                },
                {
                    name: "Branco",
                    hexCode: "#FFFFFF"
                },
                {
                    name: "Azul",
                    hexCode: "#0000FF"
                },
                {
                    name: "Rosa",
                    hexCode: "#FFC0CB"
                },
                {
                    name: "Amarelo",
                    hexCode: "#FFFF00"
                },
                {
                    name: "Vermelho",
                    hexCode: "#FF0000"
                },
            ]
        })
    }

    //Criando os produtos
    const products = await prisma.products.findMany({});

    if(products.length === 0){
        await prisma.products.createMany({
            data: [
                //Macacões
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/hf4c370e3ea38490ba4800d478f63193aq-ffac5899c202db4b6616632640828762-1024-1024.jpg",
                    name: "Macacão Zenitsu",
                    price: 85,
                    categoryId: 1,
                    colorId: 5,
                    brandId: 1,
                    description: "Apresentamos o Macacão Infantil do Zenitsu de Demon Slayer! Feito com tecido de alta qualidade e inspirado na roupa do personagem Zenitsu, este macacão apresenta cores vibrantes e detalhes incríveis, permitindo que seu filho(a) se divirta enquanto se veste como seu personagem favorito de anime.", 
                },
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/h7709d1f7c8f5416a9f68d628a62c844fe-57cae6115783677d3716632640893598-1024-1024.jpg",
                    name: "Macacão Shinobu",
                    price: 90,
                    categoryId: 1,
                    colorId: 2,
                    brandId: 1,
                    description: "A roupa de bebê de Shinobu apresenta um kimono rosa pálido com um padrão de flores brancas, e uma faixa amarrada na cintura para ajustar o tamanho. O kimono tem mangas largas e compridas com uma borda branca, assim como a gola do vestido. Para completar o visual, a roupa pode ser acompanhada por um par de meias brancas e uma faixa de cabelo combinando com o vestido.", 
                },
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/ha0c71f1564bb4331ab685734cc55bf5aq-bd1db2de9085aaa37e16632640957063-1024-1024.jpg",
                    name: "Macacão Rengoku",
                    price: 88,
                    categoryId: 1,
                    colorId: 6,
                    brandId: 1,
                    description: "O Macacão de Bebê do Rengoku é uma roupinha confortável e fofa inspirada em um personagem de Kimetsu no Yaiba. Com design vibrante, estampa do símbolo da chama e abertura com botões de pressão, é fácil de vestir e perfeito para manter os pequenos aquecidos em dias frios. Além disso, é muito versátil e pode ser usado em casa ou em passeios ao ar livre.", 
                },
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/h3fbc1fc3444f4adb9b59a605822c49b32-dbbf41643104c97a7a16632641217890-640-0.jpg",
                    name: "Macacão Tanjiro",
                    price: 78,
                    categoryId: 1,
                    colorId: 3,
                    brandId: 1,
                    description: "O Macacão de Bebê do Tanjiro é uma roupinha fofa e confortável inspirada em um personagem de Kimetsu no Yaiba. Com design em verde e preto, estampa do símbolo dos brincos de dança de Tanjiro e abertura com botões de pressão, é fácil de vestir e perfeito para manter os pequenos aquecidos em dias frios. Além disso, é muito versátil e pode ser usado em casa ou em passeios ao ar livre.", 
                },
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/h8f0ef60efc1a4d6dac3b2718d71138d7v-805652b8258f3b0fcc16632641456229-640-0.jpg",
                    name: "Macacão Minato",
                    price: 90,
                    categoryId: 1,
                    colorId: 3,
                    brandId: 1,
                    description: "O Macacão de Bebê do Minato é uma roupinha fofa e confortável inspirada em um personagem de Naruto, com design em azul e branco, abertura com botões de pressão e referências aos símbolos da Vila Oculta da Folha e do Manto do Quarto Hokage. É fácil de vestir e perfeito para manter os pequenos aquecidos em dias frios, além de ser versátil para uso em casa ou em passeios ao ar livre.", 
                },
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/h013bc656e18842b79ae96959661ba3f6e-b56ae2d8a8d389c2f816632641089994-640-0.jpg",
                    name: "Macacão Sanemi",
                    price: 85,
                    categoryId: 1,
                    colorId: 1,
                    brandId: 1,
                    description: "O Macacão de Bebê do Sanemi é uma roupinha fofa e confortável inspirada em um personagem de Kimetsu no Yaiba, com design em preto e branco e detalhes em referência ao personagem. É fácil de vestir, possui abertura com botões de pressão e é perfeito para manter os pequenos aquecidos em dias frios.", 
                },
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/046/397/products/hb9414590ef2e4060ac3aed094b263830u-e64abbf040da23a9b716632641154396-640-0.jpg",
                    name: "Macacão Nezuko",
                    price: 93,
                    categoryId: 1,
                    colorId: 4,
                    brandId: 1,
                    description: "Com um design em rosa claro e preto, o macacão de bebê da Nezuko apresenta detalhes em referência à personagem, incluindo sua fita de cabelo e o símbolo da transformação demoníaca. Feito com materiais macios e de alta qualidade, este macacão é perfeito para manter os pequenos aquecidos durante os dias mais frios. Além disso, é muito fácil de vestir e possui uma abertura com botões de pressão na parte da frente para facilitar a troca de fraldas.", 
                },

                //Tênis
                {
                    image: "https://d3ugyf2ht6aenh.cloudfront.net/stores/002/048/331/products/9f26aa5e-2eac-4093-b1e2-990971d63e7a1-be98c6af048dbbb0ed16784073642690-640-0.webp",
                    name: "All-Star Bebê Azul",
                    price: 110,
                    categoryId: 2,
                    colorId: 3,
                    brandId: 2,
                    description: "Este tênis de bebê é feito com materiais de alta qualidade e possui um design moderno e estiloso. A sola é antiderrapante e flexível, garantindo maior segurança e estabilidade durante os primeiros passos do bebê. É um calçado versátil que pode ser usado em qualquer ocasião.", 
                },
                {
                    image: "https://i.pinimg.com/236x/bf/be/e3/bfbee322b6e2e3acc2565573d90b969a.jpg",
                    name: "AirForce Baby",
                    price: 150,
                    categoryId: 2,
                    colorId: 2,
                    brandId: 1,
                    description: "Com um design moderno, é fácil de combinar com qualquer roupa. A sola de borracha é antiderrapante, garantindo que os bebês possam brincar e se movimentar com segurança.", 
                },
                {
                    image: "https://cdn.shopify.com/s/files/1/0578/8441/0027/products/S53488ceb5ff84181b123aaa6a4fbef99U.jpg?v=1676486298",
                    name: "Tênis Bebê Aranha",
                    price: 100,
                    categoryId: 2,
                    colorId: 6,
                    brandId: 4,
                    description: "O Tênis de Bebê do Homem-Aranha é um calçado estiloso e confortável que homenageia o icônico super-herói da Marvel, com design em vermelho e azul e detalhes em referência ao Homem-Aranha. Possui fechamento em velcro para facilitar a colocação e retirada, sendo uma opção prática para o dia a dia e perfeito para manter os pés do seu bebê confortáveis e protegidos.", 
                },
                {
                    image: "https://cdn.awsli.com.br/1139/1139007/produto/60401220/9ce9f8f239.jpg",
                    name: "Tênis Rosa Lã",
                    price: 90,
                    categoryId: 2,
                    colorId: 4,
                    brandId: 3,
                    description: "O Tênis de Bebê de Lã Rosa é um calçado aconchegante e fofo, feito com lã de alta qualidade e design em tom rosa pastel que se adapta a diversos estilos de roupa. Possui solado antiderrapante para maior segurança do bebê e fechamento em velcro para facilitar a colocação e retirada do tênis. É perfeito para manter os pés do seu bebê quentinhos, confortáveis e com um visual adorável.", 
                },
                {
                    image: "https://cdn.awsli.com.br/1648/1648301/produto/131398161/85cd8a0248.jpg",
                    name: "All-Star Bebê Amarelo",
                    price: 100,
                    categoryId: 2,
                    colorId: 5,
                    brandId: 2,
                    description: "Este tênis de bebê é feito com materiais de alta qualidade e possui um design moderno e estiloso. A sola é antiderrapante e flexível, garantindo maior segurança e estabilidade durante os primeiros passos do bebê. É um calçado versátil que pode ser usado em qualquer ocasião.", 
                },

                //Camisa
                {
                    image: "https://images.tcdn.com.br/img/img_prod/497578/camisa_bebe_polo_100_algodao_egipcio_10993_1_e5f77ee5c42f5f664cb7ddd6fe658b50.jpg",
                    name: "Polo Vermelha",
                    price: 40,
                    categoryId: 3,
                    colorId: 6,
                    brandId: 4,
                    description: "A Camisa Polo Vermelha de Bebê é uma peça clássica e elegante, com um design sofisticado em vermelho que apresenta um colarinho polo e botões frontais. Feita com materiais de alta qualidade, é leve e confortável, ideal para manter o bebê feliz durante todo o dia.", 
                },
                {
                    image: "https://cf.shopee.com.br/file/be217652a4311bc1e43ae837d7627dee",
                    name: "Lacoste Preta",
                    price: 60,
                    categoryId: 3,
                    colorId: 1,
                    brandId: 4,
                    description: "A Camisa de Bebê Lacoste Preta é uma peça clássica e atemporal, com um design elegante e discreto em preto que apresenta um colarinho dobrável e botões frontais. Feita com materiais de alta qualidade, é leve e confortável, ideal para manter o bebê feliz durante todo o dia.", 
                },
                {
                    image: "https://static.netshoes.com.br/produtos/blusa-bebe-fakini-manga-bufante-pandinha-feminina/76/E99-1078-876/E99-1078-876_zoom1.jpg?ts=1632237837&ims=544x",
                    name: "Camiseta Menina Panda",
                    price: 40,
                    categoryId: 3,
                    colorId: 4,
                    brandId: 3,
                    description: "A Camiseta Rosa Panda é uma peça adorável e divertida para o guarda-roupa do seu bebê, com uma estampa fofa de um panda em tons de rosa, preto e branco. Feita com um tecido macio e confortável, é perfeita para dias quentes ou para ser usada como camada em dias mais frescos.", 
                },
                {
                    image: "https://1139028l.ha.azioncdn.net/img/2020/02/produto/2120/9406-marinho-easy-resize-com.jpg?ims=800x800",
                    name: "Blusão Moletom",
                    price: 60,
                    categoryId: 3,
                    colorId: 3,
                    brandId: 4,
                    description: "O Blusão de Moletom é uma peça essencial e confortável para o guarda-roupa do seu bebê, com um design clássico com capuz, bolso canguru e mangas longas. Feito com um tecido macio e quentinho, é perfeito para dias mais frescos ou como camada adicional em dias frios.", 
                },
                {
                    image: "https://loja1.varejovirtual.net.br/wp-content/uploads/2020/06/REFC064-1.jpg",
                    name: "Camiseta Menina Branca",
                    price: 30,
                    categoryId: 3,
                    colorId: 2,
                    brandId: 3,
                    description: "A camiseta de bebê para menina na cor branca é uma peça básica e versátil que combina com várias outras peças do guarda-roupa da sua filha. Feita com um tecido macio e confortável, esta camiseta apresenta um design simples com gola redonda e mangas curtas.", 
                },

                //Calça
                {
                    image: "https://cf.shopee.com.br/file/be5d38333228c1c43d0e4ee8dd04bcee",
                    name: "Baby Jeans",
                    price: 60,
                    categoryId: 4,
                    colorId: 3,
                    brandId: 1,
                    description: "A calça jeans é uma peça clássica que não pode faltar no guarda-roupa de qualquer bebê. Esta calça de bebê jeans é feita com um tecido de qualidade, que é durável e resistente, além de confortável e macio para a pele sensível do bebê.", 
                },
                {
                    image: "https://699028l.ha.azioncdn.net/img/2022/01/produto/15367/10842-calca-bebe-menino-ursinhos-amarelo-preto-7468-2.jpg?ims=fit-in/800x800/filters:fill(white)",
                    name: "Moletom Amarelo",
                    price: 55,
                    categoryId: 4,
                    colorId: 5,
                    brandId: 1,
                    description: "Uma calça moletom amarela bebê é uma peça de roupa informal e confortável feita de um tecido macio e quente, conhecido como moletom. A cor amarela bebê é um tom claro e suave de amarelo, frequentemente associado à delicadeza e à suavidade dos tons pastel.", 
                },
                {
                    image: "https://ropek.com.br/wp-content/uploads/2021/03/calca-saruel-inverno-quentinho-nenem-baby-tiptop-bebe-loja-online-moda-ropek-atacado-varejo-rn-estampas-liso-confortavel-5.jpg",
                    name: "Moletom Rosa Gatinho",
                    price: 70,
                    categoryId: 4,
                    colorId: 4,
                    brandId: 1,
                    description: "Um moletom rosa gatinho bebê é uma peça de roupa casual e fofa, perfeita para bebês e crianças pequenas. Feito de um tecido macio e quente, o moletom é perfeito para manter os pequenos quentinhos em dias frios.", 
                },
                {
                    image: "https://lojafarm.vteximg.com.br/arquivos/ids/2838387/image-12a70bbd55d04271ad97095442ea07f3.jpg?v=637944365186070000",
                    name: "Moletom Bichinhos",
                    price: 80,
                    categoryId: 4,
                    colorId: 2,
                    brandId: 3,
                    description: "Um moletom moderno branco é uma peça de roupa casual e elegante, perfeita para aqueles que buscam um visual descontraído e atual. Feito de um tecido macio e confortável, o moletom é ideal para dias mais frescos ou para ser usado em ambientes com ar-condicionado.", 
                },
                {
                    image: "https://699028l.ha.azioncdn.net/img/2022/01/produto/15368/10843-calca-bebe-menino-ursinhos-azul-mescla-7468.jpg?ims=fit-in/800x800/filters:fill(white)",
                    name: "Menino Ursinhos",
                    price: 55,
                    categoryId: 4,
                    colorId: 3,
                    brandId: 4,
                    description: "Um moletom para menino com estampa de ursinhos é uma peça de roupa infantil divertida e fofa. Feito de um tecido macio e confortável, o moletom é perfeito para dias mais frescos ou para ser usado em ambientes com ar-condicionado.", 
                },
            ]
        })
    }
}

main()
    .then(() => { console.log("Successful data registration!!") })
    .catch(e => { console.log(e); process.exit(1) })
    .finally(async() => { await prisma.$disconnect() })