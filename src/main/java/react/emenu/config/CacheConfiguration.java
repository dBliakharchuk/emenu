package react.emenu.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(react.emenu.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(react.emenu.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(react.emenu.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(react.emenu.domain.Restaurant.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Photo.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Menu.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Dish.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.Ingredient.class.getName(), jcacheConfiguration);
            cm.createCache(react.emenu.domain.IngredientToDish.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
