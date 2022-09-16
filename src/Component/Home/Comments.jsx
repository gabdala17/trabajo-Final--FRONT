import React, { useEffect, useState } from "react";
import { getComments } from "../../Redux-actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./comments.css";
import { Key } from "@mui/icons-material";

function Comments() {
  let dispatch = useDispatch();

  const userComment = useSelector((state) => state.comments); //

  useEffect(() => {
    dispatch(getComments());
  }, []);

  //console.log("este es user comment", userComment);

  let topComments = userComment?.filter(
    (e) => Number(e.rating) > 8 && e.userEmail !== null
  );

  //console.log("este es top comment", topComments);

  let top4Comments = [];

  for (let i = 0; i <= topComments.length - 1; i++) {
    top4Comments.push(topComments[i]);
  }
  //console.log("top coments", topComments);
  //console.log("top 4 coments", top4Comments);

  return (
    <div className="commentsContainer">
      <div className="tituloComments">Los comentarios más valorados.</div>
      {topComments
        ? top4Comments.map((e) => {
            return (
              <div className="divCOmments">
                <div className="puntaje">Puntaje: {e.rating}</div>
                <div className="comentario">"{e.comments}"</div>
                <div className="emailComment">{e.userEmail}</div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Comments;
