"use strict";
exports.__esModule = true;
var Hero_1 = require("@/components/layout/Hero");
var HomeMenu_1 = require("@/components/layout/HomeMenu");
var SectionHeaders_1 = require("@/components/layout/SectionHeaders");
function Home() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Hero_1["default"], null),
        React.createElement(HomeMenu_1["default"], null),
        React.createElement("section", { className: "my-16 text-center" },
            React.createElement(SectionHeaders_1["default"], { subHeader: 'Our story', mainHeader: 'About us' }),
            React.createElement("div", { className: "flex flex-col max-w-md gap-4 mx-auto mt-4 text-gray-500" },
                React.createElement("p", { className: "" }, "\uD83C\uDF55 Pizza, a dish of Italian origin, consists of a flattened disk of bread dough topped with a delightful combination of olive oil, oregano, tomatoes, olives, mozzarella (or other cheese), and various other ingredients. It\u2019s baked quickly, often in a wood-fired oven heated to a very high temperature, resulting in a crispy crust and gooey cheese. From the classic Margherita\u2014topped with tomatoes, mozzarella, and basil\u2014to creative variations like California-style pizza, this beloved food has conquered taste buds worldwide. Whether you prefer pepperoni or arugula, pizza remains a universal favorite"),
                React.createElement("p", null, "Pizza Hut\u2019s fragrance adventure took an unexpected turn when they introduced their limited edition Eau de Pizza Hut in 2012. The scent was initially launched in Canada and later made its way to the United States for a Valentine\u2019s Day promotion. But here\u2019s the twist: it didn\u2019t smell like pizza at all! Instead, lucky recipients described it as having the warm and pleasing aroma of cinnamon rolls"))),
        React.createElement("section", { className: "my-8 text-center" },
            React.createElement(SectionHeaders_1["default"], { subHeader: 'Don\'t hesitate', mainHeader: 'Contact us' }),
            React.createElement("div", { className: "mt-8" },
                React.createElement("a", { className: "text-4xl text-gray-500 underline", href: "tel: +084906440368" }, " +084906440368 ")))));
}
exports["default"] = Home;
