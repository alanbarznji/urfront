import { LoveProductAction } from "@/Redux/Action/ProductAction";
import React, { useState } from "react";
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
  console.log(item, "<<<<<<<");
  const [isFavorite, setIsFavorite] = useState(false);
const dispatch=useDispatch()
  const getCategoryIcon = (category) => {
    const categoryIcons = {
      burgers: "fa-hamburger",
      sandwiches: "fa-bread-slice",
      pizzas: "fa-pizza-slice",
      salads: "fa-leaf",
      desserts: "fa-ice-cream",
      drinks: "fa-glass-martini",
      sides: "fa-french-fries",
      mains: "fa-utensils",
    };
    return categoryIcons[category] || "fa-utensils";
  };

  const toggleFavorite = (id,count) => {
    setIsFavorite(!isFavorite);

    // ❤️ Create floating hearts animation
    if (!isFavorite) {
      createFloatingHearts(id,count);
    }
  };

  const createFloatingHearts = (id,count) => {
    const formData = new FormData();
    formData.append("countLike", count+1);
    console.log("dakodass");
    dispatch(LoveProductAction(id, formData));
    const heartsCount = 10;
    
    for (let i = 0; i < heartsCount; i++) {
      setTimeout(() => {
        const heart =document.createElement("div");
        heart.className = "floating-heart";
        heart.innerHTML = "❤️";
        const randomX=Math.random()*window.innerWidth;
        const randomY=window.innerHeight;
        heart.style.left=randomX+"px";
        heart.style.top=randomY+"px";   
        document.body.appendChild(heart);
        setTimeout(() => {
          heart.remove();
        }, 500);

      },i*100)
      // setTimeout(() => {
      //   const heart = document.createElement("div");
      //   heart.className = "floating-heart";
      //   heart.innerHTML = "❤️";

      //   const randomX = Math.random() * window.innerWidth;
      //   const randomY = window.innerHeight;

      //   heart.style.left = randomX + "px";
      //   heart.style.top = randomY + "px";
      //   document.body.appendChild(heart);

      //   setTimeout(() => {
      //     heart.remove();
      //   }, 500);
      // }, i * 100);
    }
  };

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
              onClick={()=>toggleFavorite(item.id,item.countLike)}
            >
              <i
                className={`fa-heart ${
                  isFavorite ? "fas text-danger  " : "far"
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
