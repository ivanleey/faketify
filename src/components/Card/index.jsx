import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { useState } from "react";
import "./homecard.scss";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addSongsInPlayListAction } from "../../actions/neteaseAction";
const { Meta } = Card;
const HomeCard = (props) => {
  //   const [loading, setLoading] = useState(true);
  const { loading, name, picUrl, singerName } = props;
  const { isHover, id, type } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {/* <Switch checked={!loading} onChange={props.cc} /> */}

      <Card
        style={{
          width: 187,
          height: 277,
          marginTop: 30,
          marginRight: 20,
          // display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          backgroundColor: isHover ? "#262626" : "rgb(23,23,23)",

          color: "white",
          border: "none",
          position: "relative",
          cursor: "pointer",
          // flexShrink: 0,
        }}
        loading={loading}
        onClick={() => {
          if (type === "list") {
            navigate(`/playListDetails/${id}`);
          } else {
            // console.log(id);
            let data = {
              name,
              id,
              ar: [
                {
                  name: singerName,
                },
              ],
              al: {
                picUrl,
              },
            };
            addSongsInPlayListAction(data)(dispatch);
          }
        }}
      >
        <div
          className="playButton"
          style={{ display: isHover ? "block" : "none" }}
        >
          <AiFillPlayCircle size={50} color={"#1cdf63"} />
        </div>

        <img
          src={picUrl}
          alt=""
          style={{ width: 161, height: 164, borderRadius: "3%" }}
        />
        <div className="singerName">{singerName}</div>
        <div className="descInCard">{name}</div>
        {/* <Meta
          avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1" />}
          title="Card title"
          description="This is the description"
        /> */}
      </Card>
    </>
  );
};
export default HomeCard;
