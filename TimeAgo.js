// @flow
import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import "moment/locale/es";

export default class TimeAgo extends Component {
  props: {
    time: string,
    interval?: number,
    hideAgo?: boolean,
    language?: string
  };
  state: { timer: null | number } = { timer: null };

  static defaultProps = {
    hideAgo: false,
    interval: 60000
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        this.update();
      }, this.props.interval)
    });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo, language = "en" } = this.props;
    return (
      <Text {...this.props}>
        {moment(time).locale(language).fromNow(hideAgo)}
      </Text>
    );
  }
}
