import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const SHeader = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Icon = styled.div`
  height: 30px;
  width: 30px;
  background: url("https://nomadcoders.co/m.png");
  background-size: cover;
  margin-left: 20px;
`;

const Title = styled(Link)`
  height: 50px;
  color: #f0932b;
  font-weight: 600;
  margin-right: 20px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#f0932b" : "transparent")};
  transition: border-bottom 0.3s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = ({ location: { pathname } }) => (
  <SHeader>
    <Icon></Icon>
    <Title to="/">NOMFLIX</Title>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </SHeader>
);

export default withRouter(Header);
