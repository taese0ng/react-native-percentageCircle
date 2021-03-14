import React from 'react';
import styled from 'styled-components/native';
import Color from '../assets/Color';

interface Props {
  InnerRender?: React.FC;
  size: Number;
  borderWidth: Number;
  percentage: Number;
  baseColor?: String;
  gaugeColor?: String;
}

const PercentageCircle: React.FC<Props> = (props) => {
  const {
    InnerRender,
    size,
    borderWidth,
    percentage,
    baseColor,
    gaugeColor,
  } = props;

  return (
    <BaseCircle radius={size} color={baseColor}>
      <InnerCircle radiusMinusBorder={size - borderWidth}>
          {
              InnerRender &&
              <InnerRender/>
          }
      </InnerCircle>
      <LeftPercentageGauge
        color={gaugeColor}
        radius={size}
        rotation={percentage}
        style={{
          zIndex: 2,
          transform: [
            {translateX: size / 4},
            {rotate: `${(percentage > 50 ? 50 : percentage) * 3.6}deg`},
            {translateX: -size / 4},
          ],
        }}
      />
      <RightPercentageGauge
        radius={size}
        color={percentage >= 50 ? gaugeColor : Color.gray04}
        style={{
          zIndex: percentage >= 50 ? 1 : 3,
          transform: [
            {translateX: -size / 4},
            {rotate: `${(percentage >= 50 ? percentage - 50 : 50) * 3.6}deg`},
            {translateX: size / 4},
          ],
        }}
      />
    </BaseCircle>
  );
};

const BaseCircle = styled.View<{radius?: Number; color?: String}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.radius || '200'}px;
  height: ${(props) => props.radius || '200'}px;
  border-radius: ${(props) => props.radius || '100'}px;
  background-color: ${(props) => props.color || Color.gray04};
`;

const InnerCircle = styled.View<{radiusMinusBorder?: Number; color?: String}>`
  position: absolute;
  z-index: 4;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.radiusMinusBorder || '185'}px;
  height: ${(props) => props.radiusMinusBorder || '185'}px;
  border-radius: ${(props) => props.radiusMinusBorder || '100'}px;
  background-color: ${(props) => props.color || Color.white};
`;

const LeftPercentageGauge = styled.View<{
  radius?: Number;
  color?: String;
  rotation?: Number;
}>`
  width: ${(props) =>
    props.radius / 2 - (props.rotation < 50 ? 1 : 0) || '100'}px;
  height: ${(props) => props.radius || '200'}px;
  background: ${(props) => props.color || Color.pink};
  border-radius: ${(props) => props.radius || '100'}px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0.1px;
`;

const RightPercentageGauge = styled.View<{radius?: Number; color?: String}>`
  width: ${(props) => props.radius / 2 || '100'}px;
  height: ${(props) => props.radius || '200'}px;
  background: ${(props) => props.color || Color.pink};
  border-radius: ${(props) => props.radius || '100'}px;
  border-top-left-radius: 0.5px;
  border-bottom-left-radius: 0px;
`;

export default PercentageCircle;
