import Title from "./Title";

const TitleList = ({ name, titles, toggle, watchList, providerId }) => {
  return (
    <div className="titleList">
      <div className="title">
        <h1>{name || `The provider ${providerId} doesn't exist`}</h1>
        <div className="titles-wrapper">
          {name &&
            titles.length > 0 &&
            titles.map((title) => {
              const onWatchList =
                watchList.findIndex((item) => item === title) === -1
                  ? false
                  : true;
              return (
                <Title
                  key={title.id}
                  title={title}
                  toggle={toggle}
                  onWatchList={onWatchList}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TitleList;
