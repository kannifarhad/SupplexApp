
type Props = {
  mainIcon: string;
  footerIcon: string;
  title: JSX.Element | string;
  description?: JSX.Element | string;
  foooterText: JSX.Element | string;
  color: string;
  Component?: any;
}


export const DashBoardInfoBlock = ({ mainIcon, footerIcon, title, description, foooterText, color, Component }:Props) =>{
  return (
    <div className="whiteBlock dashboardInfoBlock">
      <div className={`headContent ${color}`}>
        <span className={`mainIcon ${mainIcon}`}></span>
      </div>

      <div className="infoText">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>

      <div className="clear"></div>

      <div className="infoBlockContent">{Component && <Component />}</div>
      <div className="infoFooter">
        <div className="iconFooter">
          <span className={footerIcon}></span>
        </div>
        <div className="textFooter">{foooterText}</div>
      </div>
    </div>
  );
}
