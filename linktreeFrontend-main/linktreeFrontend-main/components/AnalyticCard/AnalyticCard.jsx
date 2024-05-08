/* eslint-disable react/prop-types */
import "./analyticCard.css";

const AnalyticCard = (props) => {
  return (
    <>
      <div className="analyticsCard">
      <div className="analyticsCardTitle">{props.stats.title}</div>
      
        <div className="analyticsCardInner">
          <div className="analyticsCardStats">{props.stats.stat}</div>
        </div>
       </div>
    </>
  );
};

export default AnalyticCard;
