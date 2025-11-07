import { LoveProductAction } from "@/Redux/Action/ProductAction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function MenuItemCard({
  item,
  currencySymbol,
  convertPrice,
  t,
  darkMode,
  language,
}) {
  // ✅ Prevent crash if item is undefined (Next.js build protection)
  if (!item || typeof item !== "object") return null;
 const [data, setData] = useState(
   JSON.parse(localStorage.getItem("lovedata")) || []
 );
  const [isFavorite, setIsFavorite] = useState(false);
  const [Favorite, setFavorite] = useState(localStorage.getItem("lovedata") ||[]);
  const [Loading, setLoading] = useState(false);
const dispatch=useDispatch()
  // const getCategoryIcon = (category) => {
  //   const categoryIcons = {
  //     burgers: "fa-hamburger",
  //     sandwiches: "fa-bread-slice",
  //     pizzas: "fa-pizza-slice",
  //     salads: "fa-leaf",
  //     desserts: "fa-ice-cream",
  //     drinks: "fa-glass-martini",
  //     sides: "fa-french-fries",
  //     mains: "fa-utensils",
  //   };
  //   return categoryIcons[category] || "fa-utensils";
  // };

  const toggleFavorite = (id,count,date) => {
    setIsFavorite(!isFavorite);

    // ❤️ Create floating hearts animation
    if (!isFavorite) {
      createFloatingHearts(id, count, date);
    }
  };
useEffect(() => {
    const lovedata = JSON.parse(localStorage.getItem("lovedata")) || [];
    const isLiked = lovedata.filter((love) => love.id === item.id && love.Date + 24 * 60 * 60 * 1000 > Date.now());
    setFavorite(isLiked);
}, [Loading]);
  const createFloatingHearts = (id, count, date) => {
    const formData = new FormData();
    formData.append("countLike", count + 1);
 

 
    console.log(Date.now(), "dateString");
    setLoading(true);
    dispatch(LoveProductAction(id, formData, Date.now()));
    const heartsCount = 10;
    
    for (let i = 0; i < heartsCount; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerHTML = "❤️";
        const randomX = Math.random() * window.innerWidth;
        const randomY = window.innerHeight;
        heart.style.left = randomX + "px";
        heart.style.top = randomY + "px";
        document.body.appendChild(heart);
        setTimeout(() => {
          heart.remove();
        }, 500);
      }, i * 100);
      setLoading(false);
 
    }
  };
useEffect(() => {
    const lovedata = JSON.parse(localStorage.getItem("lovedata")) || [];
    const isLiked = lovedata.some((love) => love.id === item.id && love.Date + 24 * 60 * 60 * 1000 > Date.now());
    setIsFavorite(isLiked);
}, [Loading]);
  const a=data.filter((e) =>  e.id===item.id);
  console.log(a,"a");
  return (
    <div className="menu-item-card">
      <div
        className={`card h-100 border-0 shadow-hover ${
          darkMode ? "bg-dark text-light" : ""
        }`}
      >
        <div className="card-img-container" data-category={item.category}>
          <div className="item-icon">
            <img
              src={`${item.imageUrl}`}
              className="card-img-top"
              alt={item.name}
              loading="lazy"
            />
          </div>

          <div className="item-badges">
            {item.bestseller && (
              <span className="badge badge-bestseller">
                <i className="fas fa-star me-1"></i> {t("bestseller")}
              </span>
            )}
            {item.new && <span className="badge badge-new">{t("new")}</span>}
          </div>

          <div className="category-badge">{t(`${item.category.name}`)}</div>

          <div className="overlay-buttons">
            <button
              className="action-btn favorite"
              aria-label="Add to favorites"
              onClick={() => {
                Favorite.length >= 1 &&
                     Favorite[0].Date + 24 * 60 * 60 * 1000 > Date.now()?window.alert(language=="en"?"You can like this item once every 24 hours":"يمكنك الإعجاب بهذا العنصر مرة واحدة كل 24 ساعة"):
                toggleFavorite(item.id, item.countLike, item.createdAt);
                console.log("clicked favorite",Favorite);
              }}
            >
              <i
                className={`fa-heart ${
                  isFavorite ||
                  (Favorite.length >= 1 &&
                     Favorite[0].Date + 24 * 60 * 60 * 1000 > Date.now())
                    ? "fas text-danger  "
                    : "far"
                }`}
              ></i>
            </button>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="item-title">
              {language == "ar" ? item.namear : item.name}
            </h5>
            <div className="price-tag-new">{item.price} IQD</div>
          </div>

          <div className="item-content">
            <div className="item-description-wrapper">
              <p className="item-description-new">
                {language == "ar" ? item.descriptionar : item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
