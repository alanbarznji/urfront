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
  if (!item || typeof item !== "object") return null;

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("lovedata")) || []
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [Favorite, setFavorite] = useState(
    localStorage.getItem("lovedata") || []
  );
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleFavorite = (id, count, date) => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      createFloatingHearts(id, count, date);
    }
  };

  useEffect(() => {
    const lovedata = JSON.parse(localStorage.getItem("lovedata")) || [];
    const isLiked = lovedata.filter(
      (love) =>
        love.id === item.id && love.Date + 24 * 60 * 60 * 1000 > Date.now()
    );
    setFavorite(isLiked);
  }, [Loading]);

  const createFloatingHearts = (id, count, date) => {
    const formData = new FormData();
    formData.append("countLike", count + 1);

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
    const isLiked = lovedata.some(
      (love) =>
        love.id === item.id && love.Date + 24 * 60 * 60 * 1000 > Date.now()
    );
    setIsFavorite(isLiked);
  }, [Loading]);

  const a = data.filter((e) => e.id === item.id);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="menu-item-card-horizontal"
      style={{
        display: "flex",
        flexDirection: "row",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        transition: "all 0.3s ease",
        cursor: "pointer",
        minHeight: isMobile ? "140px" : "180px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(212, 167, 106, 0.25)";
        e.currentTarget.style.borderColor = "#d4a76a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.borderColor = "#333";
      }}
    >
      {/* Image Container - Left Side */}
      <div
        className="card-img-container-horizontal"
        style={{
          position: "relative",
          minWidth: isMobile ? "120px" : "200px",
          width: isMobile ? "120px" : "200px",
          height: isMobile ? "140px" : "180px",
          overflow: "hidden",
          backgroundColor: "#252018",
        }}
      >
        <img
          src={`${item.imageUrl}`}
          alt={language === "ar" ? item.namear : item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
          loading="lazy"
        />

        {/* Bestseller Badge */}
        {item.bestseller && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: language === "ar" ? "auto" : "10px",
              right: language === "ar" ? "10px" : "auto",
              backgroundColor: "#d4a76a",
              color: "#252018",
              padding: "4px 10px",
              borderRadius: "12px",
              fontSize: "0.7rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              zIndex: 2,
            }}
          >
            <i className="fas fa-star"></i>
            {t("bestseller") || "الأكثر طلباً"}
          </div>
        )}

        {/* Heart Button */}
        <button
          style={{
            position: "absolute",
            bottom: "10px",
            left: language === "ar" ? "auto" : "10px",
            right: language === "ar" ? "10px" : "auto",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 3,
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => {
            Favorite.length >= 1 &&
            Favorite[0].Date + 24 * 60 * 60 * 1000 > Date.now()
              ? window.alert(
                  language === "en"
                    ? "You can like this item once every 24 hours"
                    : "يمكنك الإعجاب بهذا العنصر مرة واحدة كل 24 ساعة"
                )
              : toggleFavorite(item.id, item.countLike, item.createdAt);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff4081";
            e.currentTarget.style.transform = "scale(1.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i
            className={`fa-heart ${
              isFavorite ||
              (Favorite.length >= 1 &&
                Favorite[0].Date + 24 * 60 * 60 * 1000 > Date.now())
                ? "fas"
                : "far"
            }`}
            style={{
              fontSize: "1.1rem",
              color:
                isFavorite ||
                (Favorite.length >= 1 &&
                  Favorite[0].Date + 24 * 60 * 60 * 1000 > Date.now())
                  ? "#e91e63"
                  : "#333",
              transition: "color 0.3s ease",
            }}
          ></i>
        </button>
      </div>

      {/* Content Container - Right Side / Bottom on Mobile */}
      <div
        style={{
          padding: isMobile ? "12px" : "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <div>
          <h5
            style={{
              margin: 0,
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              fontWeight: "700",
              color: "#f5f5f5",
              lineHeight: "1.4",
            }}
          >
            {language === "ar" ? item.namear : item.name}
          </h5>
        </div>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: isMobile ? "0.75rem" : "0.8rem",
            color: "#999",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: isMobile ? 1 : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {language === "ar" ? item.descriptionar : item.description}
        </p>

        {/* Footer: Price and Add Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? "8px" : "12px",
            paddingTop: "8px",
          }}
        >
          <div
            style={{
              fontSize: isMobile ? "1rem" : "1.15rem",
              fontWeight: "700",
              color: "#d4a76a",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            {item.price}
            <span
              style={{
                fontSize: isMobile ? "0.65rem" : "0.7rem",
                marginLeft: "4px",
              }}
            >
              IQD
            </span>
          </div>

          <button
            style={{
              backgroundColor: "#d4a76a",
              color: "#252018",
              border: "none",
              padding: isMobile ? "6px 12px" : "8px 14px",
              borderRadius: "10px",
              fontSize: isMobile ? "0.75rem" : "0.8rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.backgroundColor = "#c99a58";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(212, 167, 106, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.backgroundColor = "#d4a76a";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <i className="fas fa-plus"></i>
            {language === "ar" ? "إضافة" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
