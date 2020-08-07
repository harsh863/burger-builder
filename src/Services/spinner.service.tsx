import {
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClipLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader,
    RingLoader, RiseLoader, RotateLoader, ScaleLoader, SkewLoader, SquareLoader
} from "react-spinners";
import React from "react";
import {RandomColorUtils} from "../Utils/random-color.utils";

const color= RandomColorUtils.getRandomColor();

export class SpinnerService {

    private static instance: SpinnerService;

    static getInstance(): SpinnerService {
        if (!SpinnerService.instance) {
            SpinnerService.instance = new SpinnerService();
        }
        return SpinnerService.instance;
    }

    getRandomSpinners = () => {
        const spinners = [
            <BeatLoader color={color} size={20} margin={8}/>,
            <BounceLoader color={color} size={90} />,
            <CircleLoader color={color} size={90} />,
            <ClimbingBoxLoader color={color} size={25} />,
            <ClipLoader color={color} size={60} />,
            <ClockLoader color={color} size={70} />,
            <DotLoader color={color} size={120} />,
            <FadeLoader color={color} height={25} width={10} radius={10} margin={8}/>,
            <GridLoader color={color} size={15} margin={5}/>,
            <HashLoader color={color} size={70}/>,
            <MoonLoader color={color} size={60}/>,
            <PacmanLoader color={color} size={30} margin={5}/>,
            <PulseLoader color={color} size={20} margin={5}/>,
            <PropagateLoader color={color} size={20}/>,
            <PuffLoader color={color} size={70}/>,
            <RingLoader color={color} size={70}/>,
            <RiseLoader color={color} size={20} margin={4}/>,
            <RotateLoader color={color} size={25} margin={15}/>,
            <ScaleLoader color={color} height={70} width={4} radius={4} margin={4}/>,
            <SkewLoader color={color} size={35}/>,
            <SquareLoader color={color} size={65}/>
        ];
        return spinners[Math.floor(Math.random() * spinners.length)];
    }
}