const DropDown = ({ $page, pageState, handlePageState, graphRef }) => {
    const toggleMenu = false;

    const dropdownMenu = tag("span", {
        className: "icon more_vert",
        dataset: {
            action: "toggle-menu"
        },
        onclick: () => {
            const element = $page.header.get(".drop-down");
            if (element)
                element.style.display =
                    element.style.display == "none" ? "block" : "none";
        }
    });

    const container = tag("div", {
        className: "relative"
    });

    const dropdownElem = tag("div", {
        className: `pointer-events-auto drop-down absolute top-[80%] right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`
    });

    /*dropdownElem.style =
        "inset: 30px 6px auto auto; transform-origin: right top;";*/
    dropdownElem.style.display = "none";

    dropdownElem.innerHTML = `
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 divide-y divide-gray-100" aria-labelledby="dropdownLeftEndButton">
            <li data-direction='0'>
              <span class="dropdown-item  direction" >Direction</span>
            </li>
            <li data-theme="light">
              <span class="dropdown-item theme">theme</span>
            </li>
            <li data-value="false" data-collapseNodes="false">
              <span class="dropdown-item collapseNodes">collapseNodes</span>
            </li>
            <li data-value="false" data-compactNodes="false">
              <span class="dropdown-item compactNodes">compactNodes</span>
            </li>
            <li data-value="false" data-hideChildrenCount="false">
              <span class="dropdown-item hideChildrenCount">hideChildrenCount</span>
            </li>
            <li data-value="false" data-hideCollapseButton="false">
              <span class="dropdown-item hideCollapseButton">hideCollapseButton</span>
            </li>
            <li data-value="false" data-disableImagePreview="false">
              <span class="dropdown-item">disableImagePreview</span>
            </li>
          </ul>
    `;

    const list = dropdownElem.querySelectorAll("ul > li");
    const DIRECTIONS = ["DOWN", "UP", "LEFT", "RIGHT"];

    const pagestates = () => {
        const value = [];
        for (let i = 0; i < list.length; i++) {
            value.push(
                list[i]?.dataset?.direction
                    ? {
                          direction:
                              DIRECTIONS[Number(list[i].dataset.direction)]
                      }
                    : list[i]?.dataset?.theme
                    ? { theme: list[i].dataset.theme }
                    : {
                          [keys[i - 2]]: JSON.parse(list[i].dataset.value)
                      }
            );
        }
        return value.reduce((acc, value) => ({ ...acc, ...value }), {});
    };

    list[0].addEventListener("click", e => {
        const index =
            Number(list[0].dataset.direction) < 4
                ? Number(list[0].dataset.direction) + 1
                : 0;
        list[0].dataset.direction = index;
        handlePageState({
            ...pagestates(),
            direction: DIRECTIONS[index]
        });
    });
    list[1].addEventListener("click", e => {
        e.preventDefault();
        const theme = list[1].dataset.theme;
        const newtheme = theme == "dark" ? "light" : "dark";
        list[1].dataset.theme = newtheme;
        handlePageState({
            ...pagestates(),
            theme: newtheme
        });
    });

    const keys = [
        // "collapseNodes",
        "compactNodes",
        "hideChildrenCount",
        "hideCollapseButton",
        "disableImagePreview"
    ];
    list[2].addEventListener("click", e => {
        const collapseNodes = list[1].dataset.value;
        e.target.textContent = collapsGraph ? "collapseNodes" : "expandNodes";
        list[1].dataset.value = !collapseNodes;
        console.log(JSON.stringify(graphRef.current));
        if (!collapseNodes) graphRef.current?.collapsGraph();
        else graphRef.current.expandGraph();
    });

    for (let i = 3; i < list.length; i++)
        list[i].addEventListener("click", e => {
            e.preventDefault();
            //console.log(list[i].dataset.value, i);
            const value = !JSON.parse(list[i].dataset.value);
            list[i].dataset.value = value.toString();
            handlePageState({
                ...pagestates(),
                [keys[i - 2]]: value
            });
        });

    container.append(dropdownMenu, dropdownElem);

    return container;
};

export default DropDown;
