// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'
import { useState, useEffect } from 'react'
// ** Utils
import {
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent
} from '@layouts/utils'

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }

  // ** Render Nav Menu Items
const useRenderNavItems = (items, Components, resolveNavItemComponent) => {
    const [renderedItems, setRenderedItems] = useState([]);
  
    useEffect(() => {
      const rendered = items.map((item, index) => {
        const TagName = Components[resolveNavItemComponent(item)];
        if (item.children) {
          return <TagName item={item} index={index} key={item.id} />;
        } else {
          return <TagName key={item.id || item.header} item={item} />;
        }
      });
  
      setRenderedItems(rendered);
    }, [items, Components, resolveNavItemComponent]);
  
    return renderedItems;
  };

  return useRenderNavItems(props.items, Components, resolveNavItemComponent)
}

export default VerticalMenuNavItems
