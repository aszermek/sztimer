import {
    timerModeAtom,
    withInspectionAtom,
    type TimerMode,
} from "@/atoms/settingsAtoms";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAtom } from "jotai";
import { Switch } from "../ui/switch";

export const Settings: React.FC = () => {
    const [withInspection, setWithInspection] = useAtom(withInspectionAtom);
    const [timerMode, setTimerMode] = useAtom(timerModeAtom);

    const handleTimerModeChange = (value: string) => {
        if (value) {
            setTimerMode(value as TimerMode);
        }
    };

    const isInspectionDisabled = timerMode === "manual";

    return (
        <div className="flex flex-col gap-6 text-gray-800 w-full">
            {/* Timer Mode controller is first, as it controls the setting below it. */}
            <div className="flex flex-col gap-3">
                <label className="font-medium">
                    Timer Input Mode
                    <p className="text-sm text-gray-500 font-normal">
                        Choose how to start and stop the timer.
                    </p>
                </label>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={timerMode}
                    onValueChange={handleTimerModeChange}
                    className="w-full grid grid-cols-2"
                >
                    <ToggleGroupItem
                        value="spacebar"
                        aria-label="Use spacebar timer"
                    >
                        Spacebar
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="manual"
                        aria-label="Use manual time input"
                    >
                        Manual Input
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            {/* Inspection setting is now controlled by the timer mode */}
            <div className="flex justify-between items-center">
                <label
                    htmlFor="inspection-toggle"
                    // Add classes to visually indicate the disabled state
                    className={`font-medium pr-4 transition-opacity ${
                        isInspectionDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    Use inspection
                    <p className="text-sm text-gray-500 font-normal">
                        Enable 15-second inspection before the timer starts.
                    </p>
                </label>
                <Switch
                    id="inspection-toggle"
                    checked={withInspection}
                    onCheckedChange={setWithInspection}
                    // Disable the switch when in manual mode
                    disabled={isInspectionDisabled}
                />
            </div>
        </div>
    );
};
