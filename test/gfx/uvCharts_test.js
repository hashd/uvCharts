init = function() {
	var horConfig = {
        graph: {
            min: 35000
        }
	};
	var verConfig = {
        graph: {
            min: 35000,
            orientation : 'Vertical'
        }
    };

	barHorTest = uv.chart('Bar', new uv.Test().getGraphDef(), horConfig);
	tbarHorTest = uv.chart('Bar', new uv.Test().getGraphDef(), horConfig);
	barVerTest = uv.chart('Bar', new uv.Test().getGraphDef(), verConfig);
	tbarVerTest = uv.chart('Bar', new uv.Test().getGraphDef(), verConfig);

	stepUpBarHorTest = uv.chart('StepUpBar', new uv.Test().getGraphDef(), horConfig);
	tstepUpBarHorTest = uv.chart('StepUpBar', new uv.Test().getGraphDef(), horConfig);
	stepUpBarVerTest = uv.chart('StepUpBar', new uv.Test().getGraphDef(), verConfig);
	tstepUpBarVerTest = uv.chart('StepUpBar', new uv.Test().getGraphDef(), verConfig);

	stackedBarHorTest = uv.chart('StackedBar', new uv.Test().getGraphDef(), horConfig);
	tstackedBarHorTest = uv.chart('StackedBar', new uv.Test().getGraphDef(), horConfig);
	stackedBarVerTest = uv.chart('StackedBar', new uv.Test().getGraphDef(), verConfig);
	tstackedBarVerTest = uv.chart('StackedBar', new uv.Test().getGraphDef(), verConfig);

	lineHorTest = uv.chart('Line', new uv.Test().getGraphDef(), horConfig);
	tlineHorTest = uv.chart('Line', new uv.Test().getGraphDef(), horConfig);
	lineVerTest = uv.chart('Line', new uv.Test().getGraphDef(), verConfig);
	tlineVerTest = uv.chart('Line', new uv.Test().getGraphDef(), verConfig);

	areaHorTest = uv.chart('Area', new uv.Test().getGraphDef(), horConfig);
	tareaHorTest = uv.chart('Area', new uv.Test().getGraphDef(), horConfig);
	areaVerTest = uv.chart('Area', new uv.Test().getGraphDef(), verConfig);
	tareaVerTest = uv.chart('Area', new uv.Test().getGraphDef(), verConfig);

	stackareaHorTest = uv.chart('StackedArea', new uv.Test().getGraphDef(), horConfig);
	stackareaVerTest = uv.chart('StackedArea', new uv.Test().getGraphDef(), verConfig);

	centareaHorTest = uv.chart('PercentArea', new uv.Test().getGraphDef(), horConfig);
	centareaVerTest = uv.chart('PercentArea', new uv.Test().getGraphDef(), verConfig);

	centbarHorTest = uv.chart('PercentBar', new uv.Test().getGraphDef(), verConfig);
	centbarVerTest = uv.chart('PercentBar', new uv.Test().getGraphDef(), verConfig);

	donutTest = uv.chart('Donut', new uv.Test().getGraphDef(), horConfig);
	pieTest = uv.chart('Pie', new uv.Test().getGraphDef(), horConfig);

	/*tableHorTest = new uv.TableGraph(new uv.Test().getGraphDef(), horConfig);
	ttableHorTest = new uv.TableGraph(new uv.Test().getGraphDef(), horConfig);
	tableVerTest = new uv.TableGraph(new uv.Test().getGraphDef(), verConfig);
	tableVerTest = new uv.TableGraph(new uv.Test().getGraphDef(), verConfig);*/
};
